
# ramdisk init.rc
```
service logcat /system/bin/logcat -f /dev/kmsg
    class main
    oneshot

service kmsgtodisk /system/bin/kmsgredirection
    class main
    oneshot
```

/system/bin/kmsgredirection
```
#!/system/bin/sh

cat /proc/kmsg > /cache/kmsg.txt
```
