import YAML from "yaml";
import fs from "node:fs";
import styles from "./page.module.css";
import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  apps: z.array(
    z.object({
      name: z.string().min(3).max(64),
      runtime: z.string().min(3).max(64),
      organization: z.string().min(3).max(64),
      repository: z.string().min(3).max(64),
      release: z.string().min(3).max(64),
      resolution: z.enum(["480p", "720p", "1080p"]),
    }),
  ),
});

function getData() {
  return schema.parse(
    YAML.parse(fs.readFileSync("./database.yaml", { encoding: "utf8" })),
  );
}

export default function Home() {
  const data = getData();

  return (
    <main className={styles.main}>
      <ul>
        {data.apps.map((e) => (
          <li key={e.repository}>
            {e.name}{" "}
            <a
              href={`${data.url}/${e.runtime}/${e.organization}/${e.repository}/${e.release}/${e.resolution}`}
            >{`${data.url}/${e.runtime}/${e.organization}/${e.repository}/${e.release}/${e.resolution}`}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
