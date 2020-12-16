#!/usr/bin/env bash

source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-minimal.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.nvm.inc.sh

SF_NODE_VSN=${SF_NODE_VSN:-node}
nvm install ${SF_NODE_VSN}
nvm use ${SF_NODE_VSN}
