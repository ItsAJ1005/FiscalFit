#!/bin/bash

oldPalette=("#FF5733" "#33FF57" "#3357FF" "#FFFF33" "#33FFFF")
newPalette=("#FF3366" "#66FF33" "#3366FF" "#FF6633" "#33FF66")

cssFile="styles.css"

for ((i=0; i<${#oldPalette[@]}; i++)); do
    sed -i "s/${oldPalette[$i]}/${newPalette[$i]}/g" "$cssFile"
done