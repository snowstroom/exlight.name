tsc -p tsconfig.build.json
if [ $? -eq 0 ]; then
    mkdir -p dist/configs 
    cp -P src/configs/prod.env dist/configs/prod.env
    cp -P -r src/templates dist/templates
fi