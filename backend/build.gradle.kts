import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("java")
    id("idea")
    id("org.springframework.boot") version "4.0.5"
    id("io.spring.dependency-management") version "1.1.7"
    id("org.openapi.generator") version "7.21.0"
}

group = "us.drullk"
version = "1.0-SNAPSHOT"
java.toolchain.languageVersion = JavaLanguageVersion.of(25)

val openApiSpecPath = "$rootDir/src/main/resources/tictactoe-api.yml"
val openApiGeneratePath = "$rootDir/tictactoe-server-api"

sourceSets.main {
    java.srcDir("${openApiGeneratePath}/src/main/java")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("org.mariadb.jdbc:mariadb-java-client")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("io.swagger.core.v3:swagger-annotations:2.2.46")
    implementation("io.swagger:swagger-annotations:1.6.16")
}

// https://www.thewokecoder.io/generate-controller-interfaces-with-gradle/ (Caveat: Article shows Groovy not Kotlin script)
tasks.register<GenerateTask>("generateGameServerApi") {
    // Only run if files updated
    inputs.file(openApiSpecPath)
    outputs.dir(openApiGeneratePath)

    // https://github.com/OpenAPITools/openapi-generator/blob/master/modules/openapi-generator-gradle-plugin/README.adoc#openapigenerate
    this.generatorName.set("spring")
    this.inputSpec.set(openApiSpecPath)
    this.outputDir.set(openApiGeneratePath)
    this.apiPackage.set("us.drullk.api")
    this.modelPackage.set("us.drullk.model")
    this.invokerPackage.set("us.drullk.invoker")
    this.configOptions.set(
        mapOf(
            // https://openapi-generator.tech/docs/configuration/
            "generateApis" to "true",
            "generateModels" to "true",
            // https://openapi-generator.tech/docs/generators/spring/
            "interfaceOnly" to "true",
            "library" to "spring-boot",
            "openApiNullable" to "false",
            "useBeanValidation" to "true",
            "useSpringBoot4" to "true",
        )
    )
}

tasks.compileJava {
    dependsOn("generateGameServerApi")
}

tasks.classes {
    dependsOn("generateGameServerApi")
}

tasks.clean {
    delete("$rootDir/tictactoe-server-api")
}
