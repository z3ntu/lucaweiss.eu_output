# Build instructions
## Building Cyanogenmod for the Fairphone 2

* Create the repository directory, clone the manifest and sync it
```
mkdir cm13 && cd cm13
repo init -u git://github.com/CyanogenMod/android.git -b cm-13.0
repo sync
```
* Set-up your environment
```
source build/envsetup.sh
```
* Copy the `local_manifest.xml` from this repository into `.repo/local_manifests/` (you may have to create this directory), then sync again
```
repo sync
```
```
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <remote  name="z3ntu" fetch="https://github.com/z3ntu" /> 
  <project path="device/fairphone/FP2" name="android_device_fairphone_fp2" remote="z3ntu" revision="fp2-sibon" />
  <project path="kernel/fairphone/FP2" name="android_kernel_fairphone_fp2" remote="z3ntu" revision="fp2-sibon" />
</manifest>
```