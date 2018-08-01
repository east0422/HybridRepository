var fs = require('fs')

var kotlinVersion = '1.1.2-5'

fs.appendFileSync(
    'platforms/android/app/build.gradle',
    'buildscript {\n' +
    '    ext.kotlin_version = \'' + kotlinVersion + '\'\n' +
    '    dependencies {\n' +
    '        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"\n' +
    '    }\n' +
    '}\n' +
    'dependencies {\n' +
    '    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"\n' +
    '}\n' +
    'apply plugin: \'kotlin-android\'\n'
)
