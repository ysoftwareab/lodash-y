#!/usr/bin/env bash

source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-minimal.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.nvm.inc.sh

nvm use ${SF_NODE_VSN:-latest}
