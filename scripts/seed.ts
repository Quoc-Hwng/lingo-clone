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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);


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

        await db.insert(schema.units).values([
            { 
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of English",
                order: 1,
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs",
            },
            

        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?'
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.png",
                correct: true,
                text: "the man",
                audioSrc: "/es_man.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.jpg",
                correct: false,
                text: "the woman",
                audioSrc: "/es_woman.mp3"
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.jpg",
                correct: false,
                text: "the woman",
                audioSrc: "/es_robot.mp3"
            },
            
            

        ])

        console.log("Seeding finished");
    } catch(error) {
        console.log(error);
        throw new Error("Failed to seed the database")
    }
};

main();