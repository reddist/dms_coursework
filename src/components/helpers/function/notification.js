import { notification} from 'antd';

const openNotificationWithIcon = (
  type,
  title = "",
  text = "",
  duration = 2.0,
) => {
  notification[type]({
    message: title,
    description: text,
    duration
  });
};

export default openNotificationWithIcon;