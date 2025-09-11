args=("$@")

if [ ${#args[@]} -lt 1 ]; then
    echo "No arguments supplied"
else
    for i in "${args[@]}"; do
        mkdir "ex$i"
    done
fi
