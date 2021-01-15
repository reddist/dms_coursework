import { setIn } from "immutable";
import mock_config from "./ajax.mock.config";
import debounce from "lodash/debounce";
import $ from "jquery";

export const throttle_stack = {};

const getParamsString = ({ url, method, data }) =>
  `${url}_${method}_${JSON.stringify(data)}`;

const ajax = (...attrs) => {
  if (attrs.length === 1) {
    const { url, method, data, success, error, throttle } = attrs[0];
    if (throttle) {
      if (url && method && data && success && error) {
        const key = getParamsString({ url, method, data });
        if (!throttle_stack[key]) {
          throttle_stack[key] = [];
          $.ajax({
            url,
            method,
            data,
            success(...response) {
              throttle_stack[key].forEach(({ success }) => {
                success(...response);
              });
              delete throttle_stack[key];
            },
            error(...response) {
              throttle_stack[key].forEach(({ error }) => {
                error(...response);
              });
              delete throttle_stack[key];
            },
          });
        }
        throttle_stack[key].push({
          success,
          error,
        });
      } else {
        return $.ajax(...attrs);
      }
    } else {
      return $.ajax(...attrs);
    }
  } else {
    return $.ajax(...attrs);
  }
};

let logs = {};
const addToLogByGroup = (group_name, value) => {
  if (!logs[group_name]) {
    logs[group_name] = [];
  }
  logs[group_name].push(value);
};

const printLogs = () => {
  Object.entries(logs).forEach(([key, concreteLogs]) => {
    console.log(key);
    const table = concreteLogs.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    console.table(table);
    logs = setIn(logs, [key], []);
  });
};

const debouncePrintLogs = debounce(printLogs, 1000);

const log = (group_name, value) => {
  addToLogByGroup(group_name, value);
  debouncePrintLogs();
};

const getResponsesFromStorage = () => STORAGE;

export const getSaveLogMessage = (key) =>
  `Response for ${key} is saved to storage`;

export const getLoadLogMessage = (key) =>
  `Response for ${key} is taken from storage`;

const getLocalStorageResponses = () =>
  JSON.parse(localStorage.getItem("ajax_responses") || "{}");

const setLocalStorageResponses = (data) =>
  localStorage.setItem("ajax_responses", JSON.stringify(data));

export let STORAGE = getLocalStorageResponses();

const saveToStorage = (key, value) => {
  STORAGE = setIn(STORAGE, [key], value);
  log("Saved to storage", [key, value]);
};

export const getStorageKey = ({ method, url }) => `${method}:${url}`;

const getParamsFromMultiAttributes = (attrs) => {
  const url = attrs[0];
  const { success, method, error, mockOptions, ...rest } = attrs[1];
  return {
    success,
    error,
    url,
    method,
    mockOptions,
    rest,
  };
};

const getParamsFromOneAttribute = (attrs) => {
  const { success, url, method, error, mockOptions, ...rest } = attrs[0];
  return {
    success,
    error,
    url,
    method,
    mockOptions,
    rest,
  };
};

const getRequestParams = (attrs) =>
  attrs.length === 2 &&
  typeof attrs[0] === "string" &&
  typeof attrs[1] === "object"
    ? getParamsFromMultiAttributes(attrs)
    : getParamsFromOneAttribute(attrs);

const getResponse = ({ config, url, method }) => {
  const { success, error, reload_after } = config;
  if (success) {
    return {
      type: "success",
      response: success,
      save: false,
    };
  } else if (error) {
    return {
      type: "error",
      response: error,
      save: false,
    };
  } else {
    const responses = getResponsesFromStorage();
    const key = getStorageKey({ method, url });
    const response = responses[key];
    if (response) {
      const calls_qty = response.calls_qty || 0;
      if (reload_after && calls_qty < reload_after) {
        log("Taken from storage", [
          key,
          {
            ...response,
            calls_qty,
            max_calls_qty: reload_after,
          },
        ]);
        return {
          ...response,
          save: false,
          calls_qty,
          from_storage: true,
        };
      }
    }
  }
};

const makeRequest = async (attrs) =>
  new Promise((resolve, reject) => {
    ajax({
      ...attrs,
      success(data) {
        resolve({
          type: "success",
          response: data,
          save: true,
          calls_qty: 0,
        });
      },
      error(e) {
        reject({
          type: "error",
          response: e,
          save: false,
          calls_qty: 0,
        });
      },
    });
  });

const getConfig = (url, method) =>
  mock_config.find(
    (el) =>
      el.method === method &&
      (el.path.constructor === RegExp ? el.path.test(url) : el.path === url)
  );

const delayOrImmediateCall = (fn, delay) =>
  delay ? setTimeout(fn, delay) : fn();

const getAjaxPromise = ({
  type,
  response,
  success,
  error,
  delay = 0,
  save,
  url,
  method,
  save_to_local_storage,
  calls_qty = 0,
  from_storage,
}) =>
  new Promise((resolve, reject) => {
    delayOrImmediateCall(() => {
      const key = getStorageKey({ method, url });
      if (!from_storage && (save || save_to_local_storage)) {
        saveToStorage(key, {
          type,
          response,
          calls_qty,
        });
      }
      if (save_to_local_storage) {
        let responses = getLocalStorageResponses();
        responses = setIn(responses, [key], {
          type,
          response,
          calls_qty,
        });
        setLocalStorageResponses(responses);
      }
      if (type === "success") {
        if (success) {
          success(response);
        } else {
          resolve(response);
        }
      } else if (type === "error") {
        if (error) {
          error(response);
        } else {
          reject(response);
        }
      }
    }, delay);
  });

const mockedAjax = async (...attrs) => {
  if (attrs.length === 1 || attrs.length === 2) {
    const {
      success,
      error,
      url,
      method,
      mockOptions: {
        success: mockSuccess,
        error: mockError,
        delay: mockDelay,
        save: mockSave,
      } = {},
    } = getRequestParams(attrs);
    if (mockSuccess || mockError) {
      return getAjaxPromise({
        type: mockSuccess ? "success" : "error",
        response: mockSuccess || mockError,
        success,
        error,
        delay: mockDelay,
        save: mockSave,
        url,
        method,
      });
    }
    const config = getConfig(url, method);
    if (config) {
      let responseData = getResponse({ config, url, method });
      let { delay, save_to_local_storage } = config;
      if (!responseData) {
        responseData = await makeRequest({
          url,
          method,
        });
        delay = 0;
      }
      if (responseData) {
        const { response, type, save, calls_qty, from_storage } = responseData;
        return getAjaxPromise({
          type,
          response,
          success,
          error,
          delay,
          save,
          url,
          method,
          save_to_local_storage,
          calls_qty: (calls_qty || 0) + 1,
          from_storage,
        });
      }
    }
  }
  return ajax(...attrs);
};

export default process.env.NODE_ENV === "production" ? ajax : mockedAjax;
