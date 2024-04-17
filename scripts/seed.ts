import "dotenv/config";

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema: schema });

const main = async () => {
    try{
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            { 
                id: 1,
                title: "English",
                imageSrc: "gb.svg",
            },
            { 
                id: 2,
                title: "Vietnamese",
                imageSrc: "vn.svg",
            },
            { 
                id: 3,
                title: "Chinese",
                imageSrc: "cn.svg",
            },
            { 
                id: 4,
                title: "Spanish",
                imageSrc: "es.svg",
            },
            { 
                id: 5,
                title: "Japanese",
                imageSrc: "jp.svg",
            }
        ])
    } catch(error) {
        console.log(error);
        throw new Error("Failed to seed the database")
    }
};

main();