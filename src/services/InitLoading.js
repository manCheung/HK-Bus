import * as SQLite from 'expo-sqlite';
import moment from 'moment';
import { storeLocalData } from './LocalStore';
import { getAllBusRoute, getKmbBusStop } from './GetBusInfo';

const db = SQLite.openDatabase('hk_bus_eta.db');

const insertRouteDataToDB = (insertRouteQuery, list) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                insertRouteQuery,
                list,
                () => {
                    console.log(`inserted success`);
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const insertSettingDataToDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                'Insert into setting (key, value) values (?, ?), (?, ?)',
                ['language', 'tc', 'sync_time', moment().add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD').toString()],
                () => {
                    console.log(`inserted success`);
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const createBusRouteDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `create table if not exists bus_route (
                id integer primary key AUTOINCREMENT not null,
                route varchar(10) not null,
                routeId int not null,
                district varchar(255),
                company varchar(10) not null,
                orig_en varchar(255) not null,
                orig_tc varchar(255) not null,
                dest_en varchar(255) not null,
                dest_tc varchar(255) not null,
                stops TEXT not null,
                remark_en varchar(255) not null,
                remark_tc varchar(255) not null,
                multi int
            )`,
                [],
                () => {
                    console.log('created bus_route');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const createBusStopDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `create table if not exists kmb_bus_stop (
                id integer primary key AUTOINCREMENT not null,
                route varchar(10) not null,
                bound varchar(1) not null,
                service_type varchar(1) not null,
                seq varchar(1) not null,
                stop varchar(50) not null
            )`,
                [],
                () => {
                    console.log('created bus_stop');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const createHistoryDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `create table if not exists history (
                    id integer primary key AUTOINCREMENT not null,
                    route varchar(10) not null,
                    routeId int not null,
                    district varchar(255),
                    company varchar(10) not null,
                    orig_en varchar(255) not null,
                    orig_tc varchar(255) not null,
                    dest_en varchar(255) not null,
                    dest_tc varchar(255) not null,
                    stops TEXT not null,
                    remark_en varchar(255) not null,
                    remark_tc varchar(255) not null,
                    multi int,
                    time datetime not null
            )`,
                [],
                () => {
                    console.log('created bus_stop');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const createFavouriteDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `create table if not exists favourite (
									id integer primary key AUTOINCREMENT not null,
									route varchar(10) not null,
									routeId int not null,
									district varchar(255),
									company varchar(10) not null,
									orig_en varchar(255) not null,
									orig_tc varchar(255) not null,
									dest_en varchar(255) not null,
									dest_tc varchar(255) not null,
									stops TEXT not null,
									remark_en varchar(255) not null,
									remark_tc varchar(255) not null,
									multi int,
									time datetime not null
					)`,
                [],
                () => {
                    console.log('created favourite');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const createSettingDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `create table if not exists setting (
									id integer primary key AUTOINCREMENT not null,
									key varchar(50) not null,
									value varchar(50) not null
					)`,
                [],
                () => {
                    console.log('created setting');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const dropBusRouteDB = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `drop table if exists bus_route`,
                [],
                () => {
                    console.log('droped bus_route');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const dropKmbBusStopDB = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `drop table if exists kmb_bus_stop`,
                [],
                () => {
                    console.log('droped kmb_bus_stop');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const dropHistoryDB = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `drop table if exists history`,
                [],
                () => {
                    console.log('droped history');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const dropFavouriteDB = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `drop table if exists favourite`,
                [],
                () => {
                    console.log('droped history');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const dropSettingDB = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `drop table if exists setting`,
                [],
                () => {
                    console.log('droped setting');
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    reject(0);
                }
            );
        });
    });
};

const initDB = async (isFirst) => {
    if (!isFirst) {
        await dropBusRouteDB();
        await dropKmbBusStopDB();
    }
    await dropHistoryDB();
    await dropFavouriteDB();
    await dropSettingDB();

    await createBusStopDB();
    await createBusRouteDB();
    await createHistoryDB();
    await createFavouriteDB();
    await createSettingDB();
};

const init = async (bus_res, kmb_bus_stop_res, isFirst) => {
    return new Promise(async (resolve) => {
        await initDB(isFirst);

        // const needUpdate = await needUpdateData(res);
        // console.log(`need udated : ${needUpdate}`);

        const separate = 100;
        const bus_value_count = 12;
        const bus_times = Math.ceil(bus_res.length / separate);
        let currentRecordCount = bus_res.length;
        // console.log(times)
        for (let i = 0; i < bus_times; i++) {
            let loopSeparate = separate;

            if (currentRecordCount < separate) {
                loopSeparate = currentRecordCount;
            }

            let insertRouteQuery = `INSERT INTO bus_route (route, routeId, district, company, orig_en, orig_tc, dest_en, dest_tc, stops, remark_en, remark_tc, multi) 
					VALUES `;

            for (let queryLoop = 0; queryLoop < loopSeparate; queryLoop++) {
                insertRouteQuery = insertRouteQuery + `(?,?,?,?,?,?,?,?,?,?,?,?),`;
            }
            insertRouteQuery = insertRouteQuery.substring(0, insertRouteQuery.length - 1);
            await insertRouteDataToDB(insertRouteQuery, bus_res.list.splice(0, loopSeparate * bus_value_count));

            currentRecordCount = currentRecordCount - loopSeparate;
        }

        // for (let i = 0; i < bus_res.length; i++) {
        //     insertRouteQuery = insertRouteQuery + `(?,?,?,?,?,?,?,?,?,?,?,?),`;
        // }
        // insertRouteQuery = insertRouteQuery.substring(0, insertRouteQuery.length - 1);

        const kmb_bus_stop_value_count = 5;
        const kmb_bus_stop_times = Math.ceil(kmb_bus_stop_res.length / separate);
        let currentKmbStopRecordCount = kmb_bus_stop_res.length;

        for (let i = 0; i < kmb_bus_stop_times; i++) {
            let loopSeparate = separate;

            if (currentKmbStopRecordCount < separate) {
                loopSeparate = currentKmbStopRecordCount;
            }

            let insertKmbBusStopQuery = `INSERT INTO kmb_bus_stop (route, bound, service_type, seq, stop) VALUES `;

            for (let queryLoop = 0; queryLoop < loopSeparate; queryLoop++) {
                insertKmbBusStopQuery = insertKmbBusStopQuery + `(?,?,?,?,?),`;
            }
            insertKmbBusStopQuery = insertKmbBusStopQuery.substring(0, insertKmbBusStopQuery.length - 1);
            await insertRouteDataToDB(insertKmbBusStopQuery, kmb_bus_stop_res.list.splice(0, loopSeparate * kmb_bus_stop_value_count));

            currentKmbStopRecordCount = currentKmbStopRecordCount - loopSeparate;
        }

        // let insertKmbBusStopQuery = `INSERT INTO kmb_bus_stop (route, bound, service_type, seq, stop) VALUES `;
        // for (let i = 0; i < kmb_bus_stop_res.length; i++) {
        //     insertKmbBusStopQuery = insertKmbBusStopQuery + `(?,?,?,?,?),`;
        // }
        // insertKmbBusStopQuery = insertKmbBusStopQuery.substring(0, insertKmbBusStopQuery.length - 1);

        await insertSettingDataToDB();
        // insertRouteDataToDB(insertRouteQuery, bus_res.list);
        // insertRouteDataToDB(insertKmbBusStopQuery, kmb_bus_stop_res.list);
        await storeLocalData('@update_time', moment().add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD').toString());
        resolve(0);
    });
};

export const initLoading = async (isFirst) => {
    const bus_res = await getAllBusRoute();
    const kmb_bus_stop = await getKmbBusStop();
    await init(bus_res, kmb_bus_stop, isFirst);
};
