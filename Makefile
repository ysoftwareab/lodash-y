ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/js.common.node.mk
include support-firecloud/repo/mk/js.build.d.ts.mk
include support-firecloud/repo/mk/js.check.eslint.mk
include support-firecloud/repo/mk/js.test.jest.mk
include support-firecloud/repo/mk/js.publish.npg.mk

# ------------------------------------------------------------------------------

SF_DEPS_TARGETS := \
	$(SF_DEPS_TARGETS) \
	src/mixins/index.js \

JEST_ARGS := \
	$(JEST_ARGS) \
	--no-cache \

# ------------------------------------------------------------------------------

.PHONY: src/mixins/index.js
src/mixins/index.js: src/mixins/tpl.index.js
	$^ > $@
