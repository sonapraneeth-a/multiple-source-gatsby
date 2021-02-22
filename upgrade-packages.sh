#!/bin/bash

ncu -u --timeout 10000000 -x react,react-dom,remark-math

# Packages
pushd packages/plugin-components
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-collection-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-collection
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-blog-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-blog
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-project-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd packages/theme-project
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd

# Demo
pushd demo/plugin-components
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-collection-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-collection
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-collection-two
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-blog-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-blog
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-project-core
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd demo/theme-project
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd

# Test
pushd test/blog
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd test/cp
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
pushd test/home-page
ncu -u --timeout 10000000 -x react,react-dom,remark-math
popd
