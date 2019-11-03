ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/node.common.mk
include support-firecloud/repo/mk/js.build.dts.mk
include support-firecloud/repo/mk/js.check.eslint.mk
include support-firecloud/repo/mk/js.check.tsc.mk
include support-firecloud/repo/mk/js.test.jest.mk
include support-firecloud/repo/mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

ESLINT_ARGS += \
	--ignore-pattern '!.global-this.js' \

JEST_ARGS += \
	--no-cache \

SF_BUILD_TARGETS := \
	src/mixins/index.js \
	src/mixins-browser/index.js \
	src/mixins-node/index.js \
	$(SF_BUILD_TARGETS) \

# ------------------------------------------------------------------------------

.PHONY: src/mixins/index.js
src/mixins/index.js: src/mixins/tpl.index.js
	$^ > $@


.PHONY: src/mixins-browser/index.js
src/mixins-browser/index.js: src/mixins-browser/tpl.index.js
	$^ > $@


.PHONY: src/mixins-node/index.js
src/mixins-node/index.js: src/mixins-node/tpl.index.js
	$^ > $@
