#!/usr/bin/env bash

source ${SUPPORT_FIRECLOUD_DIR}/ci/brew-install-minimal.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/ci/brew-install-node.inc.sh
nvm install ${NVM_NODE}
nvm use ${NVM_NODE}
