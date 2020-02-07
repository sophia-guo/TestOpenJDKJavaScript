# action.yml
name: 'TestsOpenJDK'
description: 'Running tests against OpenJD'
inputs:
  build_list:  # id of input
    description: 'test category'
    required: false
    default: 'functional'
  test_target:  # id of input
    description: 'running test target'
    required: false
    default: '_floatSanityTests'
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.build_list }}
    - ${{ inputs.test_target }}
