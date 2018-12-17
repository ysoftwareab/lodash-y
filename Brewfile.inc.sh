#!/usr/bin/env bash

source ${SUPPORT_FIRECLOUD_DIR}/ci/brew-install-minimal.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/ci/brew-install-node.inc.sh

rm -rf ${NVM_DIR}
mkdir -p ${NVM_DIR}
nvm unalias default

nvm install ${NVM_NODE}
nvm use --delete-prefix --silent ${NVM_NODE}
