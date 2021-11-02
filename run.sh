while :
do
	rm -rf src
	git clone --depth 1 --filter=blob:none --sparse https://github.com/ERROR-404-NULL-NOT-FOUND/Arch-Revolt-Bot src
	cd src
	git sparse-checkout set src
	cd ..
	node ./src
done