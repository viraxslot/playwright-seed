#!/bin/bash

# Check env variable presence
if [ -z $env ]; then
	echo "Please set environment using 'env' parameter"
	exit 1
fi

# Check env variable correctness
re='^(api|e2e|all):(qa)$'
if ! [[ "$env" =~ $re ]]; then
	echo 'Please enter correct environment api:[env] or e2e:[env] or all:[env], where env in [qa]'
	exit 1
fi

# it's needed to change browser config with passed environment variables
# see here for more details: https://github.com/lorenwest/node-config/wiki/Environment-Variables#allow_config_mutations
eval export ALLOW_CONFIG_MUTATIONS=true

echo 'PARSED VARIABLES'
echo '----------------------------------------'
echo 'Environment: "'$env'"'
echo 'Browser: "'$browser'"'
echo 'Headless: "'$headless'"'
echo 'SlowMo: "'$slowmo'"'
echo '----------------------------------------'

# Parse env variable
IFS=':' read -r -a env_arr <<< "$env"
tests=${env_arr[0]}
nodejs_env=${env_arr[1]}

case $tests in
  'all')
    base_dir='test/**'
    mocha_env=''
  ;;
  'api')
    base_dir='test/api/**'
	  mocha_env='_'$tests
  ;;
  'e2e')
    base_dir='test/e2e/**'
	  mocha_env='_'$tests
  ;;
esac

if [[ $suites ]]; then
  mocha_env='_common'
fi

# amount of milliseconds to mark slow test
SLOW_MS=10000

mocha_run="NODE_ENV=${nodejs_env} ./node_modules/mocha/bin/mocha"
mocha_config="--slow ${SLOW_MS} --config=mocha-configs/.mocharc${mocha_env}.js"

suites=${suites//[[:blank:]]/}
IFS=',' read -r -a suites_arr <<< "$suites"

specs=()
for((i=0; i < ${#suites_arr[@]}; i++)); do
	specs[$i]="$base_dir/\*${suites_arr[$i]}\*.spec.ts"
done

spec_list=$( IFS=" "; echo "${specs[*]}" )


if [[ $suites ]]; then
  mocha_run="${mocha_run} ${spec_list}"
fi

grep=${grep//[,]/|}

if [[ $grep ]]; then
  mocha_run="${mocha_run} --grep '${grep}'"
fi

command="${mocha_run} ${mocha_config}"

echo $command
eval $command
