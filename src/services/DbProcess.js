import * as SQLite from 'expo-sqlite';
import moment from 'moment';

const db = SQLite.openDatabase('hk_bus_eta.db');

export const GetBusRouteFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select * from bus_route order by route, id`,
                [],
                (tx, results) => {
                    const { rows } = results;

                    let datas = [];
                    for (let i = 0; i < rows.length; i++) {
                        datas.push(rows.item(i));
                    }
                    resolve(datas);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const GetKmbBusStopFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select * from kmb_bus_stop`,
                [],
                (tx, results) => {
                    const { rows } = results;

                    let datas = [];
                    for (let i = 0; i < rows.length; i++) {
                        datas.push(rows.item(i));
                    }
                    resolve(datas);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const GetHistoryFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select * from history order by time desc`,
                [],
                (tx, results) => {
                    const { rows } = results;

                    let datas = [];
                    for (let i = 0; i < rows.length; i++) {
                        datas.push(rows.item(i));
                    }
                    resolve(datas);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const GetFavouriteFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select * from favourite order by time desc`,
                [],
                (tx, results) => {
                    const { rows } = results;

                    let datas = [];
                    for (let i = 0; i < rows.length; i++) {
                        datas.push(rows.item(i));
                    }
                    resolve(datas);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const GetSettingFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select * from setting`,
                [],
                (tx, results) => {
                    const { rows } = results;

                    let datas = [];
                    for (let i = 0; i < rows.length; i++) {
                        datas.push(rows.item(i));
                    }
                    resolve(datas);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                    resolve([]);
                }
            );
        });
    });
};

export const InsertHistory = async (route) => {
    // console.log('route', route);
    const exist = await IsRouteExist('history', route.routeId, route.company);
    if (exist.length > 0) {
        const id = exist[0].id;
        UpdateRouteTime(id);
    } else {
        InsertRoute('history', route);
    }
};

export const InsertFavourite = async (route) => {
    const exist = await IsRouteExist('favourite', route.routeId, route.company);
    if (exist.length > 0) {
        const id = exist[0].id;
        UpdateRouteTime(id);
    } else {
        InsertRoute('favourite', route);
    }
};

export const DeleteRoute = async (table, id) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `delete from ${table} where id = ?`,
                [id],
                (tx, results) => {
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const IsRouteExist = async (table, routeId, company) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `select id as id from ${table} where routeId = ? and company = ?`,
                [routeId, company],
                (tx, results) => {
                    const { rows } = results;
                    // console.log('rows', rows);
                    resolve(rows._array);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const UpdateRouteTime = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            const current = moment().format('YYYY-MM-DD hh:mm:ss');

            tx.executeSql(
                `update history set time = ? where id = ?`,
                [current, id],
                (tx, results) => {
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const InsertRoute = async (table, datas) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            const current = moment().format('YYYY-MM-DD hh:mm:ss');

            tx.executeSql(
                `insert into ${table} (route, routeId, district, company, orig_en, orig_tc, dest_en, dest_tc, stops, remark_en, remark_tc, multi, time)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    datas.route,
                    datas.routeId,
                    datas.district,
                    datas.company,
                    datas.orig_en,
                    datas.orig_tc,
                    datas.dest_en,
                    datas.dest_tc,
                    datas.stops,
                    datas.remark_en,
                    datas.remark_tc,
                    datas.multi,
                    current
                ],
                (tx, results) => {
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const UpdateLanguage = async (language) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `update setting set value = ? where key = 'language'`,
                [language],
                (tx, results) => {
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};

export const UpdateSyncTime = async (syncTime) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                `update setting set value = ? where key = 'sync_time'`,
                [syncTime],
                (tx, results) => {
                    resolve(0);
                },
                (_, err) => {
                    console.log(`err: ${err}`);
                }
            );
        });
    });
};
