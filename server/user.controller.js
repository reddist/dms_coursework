const table_names = require("./tables_info/table_names");
const db = require('./db_model')
const tables = require('./tables_info/tables')

class UserController {

    async getAvailableTables(req, res) {
        res.json({ available_tables: table_names });
    }

    async getTableData(req, res) {
        const { table_name } = req.query;
        const table_data = await db.query(`select * from ${table_name}`);
        const table_description = tables[table_name] || {};
        const keys = table_description["key"];
        const formatted_data = table_data["rows"].map((row) => {
            let new_row = {};
            Object.keys(row).forEach((key) => {
                if (!keys.includes(key)) {
                    new_row = {
                        ...new_row,
                        [key]: row[key]
                    };
                }
            });
            let keyObj = {};
            keys.map((key_name) => {
                keyObj = {
                    ...keyObj,
                    [key_name]: row[key_name],
                }
                return key_name;
            });
            new_row = {
                ...new_row,
                key: keyObj,
            }
            return new_row;
        });
        //console.log(formatted_data);
        res.json({
            table_data: {
                ...table_description,
                data: formatted_data
            }
        });
    }

    async createHike(req, res) {
        const {com_ncom, category, type_id, number_days, month, } = req.body;
        const newHike =  await db.query('SELECT create_hike($1, $2, $3, $4, $5, $6, $7) RETURNING *',[type_id, category, com_ncom, month, 0, number_days] );
        res.json(newHike.rows[0]);
    }

    async createWish(req, res) {
        const {participant_name, hikeType, hikeKind, category, month} = req.body;
        debugger;
        console.log(req.body);
        const type_id = await db.query('Select type_id from type_hike where type_hike = $1' , [hikeType]);
        const part_id = await db.query('Select id from participants where fcs = $1', [participant_name]);
        if(part_id==null) await db.query('Select create_participant($1)', [participant_name]);
        const newWish = await db.query('Insert into wishes(type_id, category, com_ncom, participant_id, month) values ($1, $2, $3, $4, $5) ', [type_id, category, hikeKind, part_id, month]);
        console.log("I'm here");
        res.json(newWish.rows[0]);
    }

    async createParticipant(req, res) {

    }

    async getHikes(req, res) {
        const users = await db.query('SELECT com_ncom, category, type_hike.type_hike, number_days, month, places.name, places.country from hiking_places right join hikes on hiking_places.hike_id = hikes.hike_id right join type_hike on hikes.type_id = type_hike.type_id join places on hiking_places.place_id=places.place_id');

        res.json(users.rows);
    }

    async aboutUs(req, res) {}
    async mainPage(req, res) {}
    async reviews(req, res) {}
    async contacts(req, res){}
}

module.exports = new UserController();