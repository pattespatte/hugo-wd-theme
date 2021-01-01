#!/usr/bin/env bash

cd "${0%/*}" || exit # drag file or folder to terminal window

hash convert 2>/dev/null || {
	echo >&2 "You need tree, install with 'brew install ImageMagick' on macOS and 'sudo apt-get install imagemagick' on Ubuntu.  Aborting."
	exit 1
}

if [ -z "${1}" ]; then
	echo 'Error: no input' >&2
	echo This script could be invoked as
	echo "./resize-images-wd-theme.sh '/path/to/image.jpg'"
	echo "or many at once:"
	echo "./resize-images-wd-theme.sh '/path/to/image1.jpg' '/path/to/image2.jpg' '/path/to/image3.jpg'"
	exit 1
fi

i=1

for infile_with_path in "$@"; do

	# infile_with_path=$1
	filename="${infile_with_path}"
	filename=$(basename -- "$filename")
	extension="${filename##*.}"
	filename="${filename%.*}"
	path_to_file=$(dirname "${infile_with_path}")

	cd "$path_to_file" || exit

	echo "Converting $filename.$extension"

	factor=480
	outfile=$filename-$factor"w".$extension
	convert "$filename.$extension" -filter Jinc -resize "$factor" "$outfile"

	factor=736
	outfile=$filename-$factor"w".$extension
	convert "$filename.$extension" -filter Jinc -resize "$factor" "$outfile"

	factor=980
	outfile=$filename-$factor"w".$extension
	convert "$filename.$extension" -filter Jinc -resize "$factor" "$outfile"
	i=$((i + 1))

done

# echo infile_with_path $infile_with_path
# echo filename $filename
# echo extension $extension

