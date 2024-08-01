# keystore

C:\Program Files\Common Files\Oracle\Java\javapath
keytool -genkeypair -v -storetype PKCS12 -keystore klasifikasi-daging-ayam.keystore -alias klasifikasi-daging-ayam -keyalg RSA -keysize 2048 -validity 10000

# release gradle

cd android
./gradlew clean
./gradlew bundleRelease

# release mode (testing)

npm run android -- --mode="release"
