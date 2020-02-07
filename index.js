const core = require('@actions/core');
const exec = require('@actions/exec');

function runaqaTest(version, buildList, target) {
  process.env.BUILD_LIST = buildList
  process.env.TEST_JDK_HOME = process.env.JAVA_HOME
  await exec.exec('ls')
  await exec.exec(
    'git clone --depth 1 https://github.com/AdoptOpenJDK/openjdk-tests.git'
  )
  process.chdir('./openjdk-tests')
  await exec.exec('ls -l')
  await exec.exec('git clone --depth 1 https://github.com/AdoptOpenJDK/TKG.git')
  process.chdir('./TKG')
  await exec.exec('ls -l')
  await exec.exec('make compile')
  await exec.exec('make', [`${target}`])
}


try {
  let version = core.getInput('version', {required: true})
  let buildList = core.getInput('build_list', {required: false})
  let target = core.getInput('target', {required: false})

  if (!version) version = '8'
  if (!buildList) buildList = 'openjdk'
  if (!target) target = 'jdk_math'
  if (
    buildList !== 'openjdk' &&
    buildList !== 'external' &&
    buildList !== 'functional' &&
    buildList !== 'perf' &&
    buildList !== 'system'
  ) {
    core.error(
      ` buildList should be one of [openjdk, external, functional, system, perf]. Found: ${buildList}`
    )
  }
  runaqaTest(version, buildList, target)
} catch (error) {
  core.setFailed(error.message);
}

