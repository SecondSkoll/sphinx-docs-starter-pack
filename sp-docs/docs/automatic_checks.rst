.. _automatic-checks:

Automatic checks
================

The starter pack comes with several automatic checks that you can (and should!) run on your documentation before committing and pushing changes.

The following checks are available:

.. toctree::
   :maxdepth: 1
   :glob:

   /docs/automatic_checks_*

Install prerequisite software
-----------------------------

Some of the tools used by the automatic checks might not be available by default on your system.
To install them, you need ``snap`` and ``npm``::

   sudo apt install npm snapd

To install the validation tools:

.. code-block:: bash

   make woke-install
   make pa11y-install

.. note::

   Both `woke` and `pa11y` are non-blocking checks in our current documentation workflow.

Default GitHub actions
----------------------

The starter pack uses default workflows from the
`documentation-workflows <https://github.com/canonical/documentation-workflows/>`_
repository.

It is encouraged for any projects in private repositories to use Canonical hosted
runners for documentation actions. This can be done by passing a `runs-on` key
to the underlying action. For example, see line 7 below:

.. code-block::
   :emphasize-lines: 7
   :linenos:

   jobs:
   documentation-checks:
      uses: canonical/documentation-workflows/.github/workflows/documentation-checks.yaml@main
      with:
         working-directory: "sp-docs"
         fetch-depth: 0
         runs-on: "[self-hosted, Linux, amd64, noble]"

