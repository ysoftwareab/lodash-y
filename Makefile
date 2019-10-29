ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/node.common.mk
include support-firecloud/repo/mk/js.check.eslint.mk
include support-firecloud/repo/mk/js.test.jest.mk
include support-firecloud/repo/mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

TSC = $(call npm-which,TSC,tsc)
$(foreach VAR,TSC,$(call make-lazy,$(VAR)))

JEST_ARGS += \
	--no-cache \

SF_BUILD_TARGETS := \
	src/mixins/index.js \
	src/mixins-browser/index.js \
	src/mixins-node/index.js \
	$(SF_BUILD_TARGETS) \
	build-dts \

SF_BUILD_TARGETS += \
	check-tsc \

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


.PHONY: build-dts
build-dts:
	$(TSC) -p tsconfig.declaration.json


.PHONY: check-tsc
check-tsc:
	$(TSC) --noEmit
