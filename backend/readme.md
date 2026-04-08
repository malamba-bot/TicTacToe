# The Backend

## IDE

Developed using IntelliJ Ultimate edition. The community edition is free, and ultimate edition is [free for students](https://www.jetbrains.com/academy/student-pack/).

## How to launch

Before doing anything, run `./gradlew generateGameServerApi`, and copy `.env.example` into a locally-created `.env` in this directory. Make sure to populate the missing values in the `.env` file.

Execute `./gradlew bootRun` from the CLI to compile and launch this application, with the backend as the process working directory.

Execute `./gradlew build` to compile a jar, located into `/build/libs`.
