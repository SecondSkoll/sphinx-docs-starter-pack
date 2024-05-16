# This Makefile stub allows you to customize starter pack (SP) targets.
# Consider this file as a bridge between your project
# and the starter pack's predefined targets that reside in Makefile.sp.
# 
# You can add your own, non-SP targets here or override SP targets
# to fit your project's needs. For example, you can define and use targets
# named "install" or "run", but continue to use SP targets like "sp-install"
# or "sp-run" when working on the documentation.

# Put it first so that "make" without argument is like "make help".
help:
	@echo "\n" \
        "------------------------------------------------------------- \n" \
        "* See Starter Pack help:                         make sp-help \n" \
        "------------------------------------------------------------- \n"

sp-update:
    @wget -O Makefile https://raw.githubusercontent.com/canonical/sphinx-docs-starter-pack/main/Makefile

%:
	$(MAKE) -f Makefile.sp sp-$@
