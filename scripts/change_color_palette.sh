#!/bin/bash

old_palette=("#FF5733" "#33FF57" "#3357FF" "#FFFF33" "#33FFFF")
new_palette=("#FF3366" "#66FF33" "#3366FF" "#FF6633" "#33FF66")

css_file="styles.css"

for ((i=0; i<${#old_palette[@]}; i++)); do
    sed -i "s/${old_palette[$i]}/${new_palette[$i]}/g" "$css_file"
done