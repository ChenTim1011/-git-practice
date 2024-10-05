
#### Reference: 
-[60 Linux Commands you NEED to know (in 10 minutes)](https://www.youtube.com/watch?v=gd7BXuUQ91w&t=205s&ab_channel=NetworkChuck)

Here’s a list of the commands mentioned in the video, with usage examples and explanations of each command's function:

1. **`ssh`**:
   - **Usage**: `ssh user@server_ip`
   - **Function**: Securely log into a remote machine over the network.

2. **`ls`**:
   - **Usage**: `ls -la`
   - **Function**: List files in the current directory. `-l` gives a detailed view, `-a` shows hidden files.

3. **`pwd`**:
   - **Usage**: `pwd`
   - **Function**: Prints the current working directory.

4. **`cd`**:
   - **Usage**: `cd /path/to/directory`
   - **Function**: Changes the current directory to the specified path. `cd ..` moves up one directory, `cd` takes you to the home directory.

5. **`touch`**:
   - **Usage**: `touch filename.txt`
   - **Function**: Creates an empty file if it doesn’t exist.

6. **`mkdir`**:
   - **Usage**: `mkdir new_directory`
   - **Function**: Creates a new directory.

7. **`cp`**:
   - **Usage**: `cp source_file destination_directory`
   - **Function**: Copies a file from the source to the destination.

8. **`mv`**:
   - **Usage**: `mv old_name new_name`
   - **Function**: Moves or renames a file.

9. **`rm`**:
   - **Usage**: `rm filename`
   - **Function**: Deletes a file. Use `rm -r` to remove directories recursively.

10. **`ln`**:
    - **Usage**: `ln -s target_file link_name`
    - **Function**: Creates a symbolic link (`-s` for soft link) to a file or directory.

11. **`clear`**:
    - **Usage**: `clear`
    - **Function**: Clears the terminal screen.

12. **`whoami`**:
    - **Usage**: `whoami`
    - **Function**: Displays the current logged-in user.

13. **`adduser`**:
    - **Usage**: `sudo adduser new_user`
    - **Function**: Adds a new user to the system.

14. **`su`**:
    - **Usage**: `su username`
    - **Function**: Switches to another user.

15. **`exit`**:
    - **Usage**: `exit`
    - **Function**: Exits the current user session or terminal.

16. **`passwd`**:
    - **Usage**: `passwd username`
    - **Function**: Changes the password for a user.

17. **`apt`** (Debian-based systems):
    - **Usage**: `sudo apt update`
    - **Function**: Updates package lists on Debian-based systems.

18. **`yum`** (RedHat-based systems):
    - **Usage**: `sudo yum update`
    - **Function**: Updates packages on RedHat-based systems.

19. **`man`**:
    - **Usage**: `man command_name`
    - **Function**: Displays the manual page for a given command.

20. **`what`**:
    - **Usage**: `whatis command_name`
    - **Function**: Provides a brief description of a command.

21. **`which`**:
    - **Usage**: `which command_name`
    - **Function**: Shows the location of a command's executable.

22. **`wget`**:
    - **Usage**: `wget https://example.com/file.txt`
    - **Function**: Downloads files from the web.

23. **`curl`**:
    - **Usage**: `curl https://example.com -o output.txt`
    - **Function**: Transfers data from a server and writes it to a file.

24. **`zip`**:
    - **Usage**: `zip archive.zip file1 file2`
    - **Function**: Compresses files into a `.zip` archive.

25. **`unzip`**:
    - **Usage**: `unzip archive.zip`
    - **Function**: Extracts files from a `.zip` archive.

26. **`cat`**:
    - **Usage**: `cat file.txt`
    - **Function**: Displays the contents of a file.

27. **`less`**:
    - **Usage**: `less file.txt`
    - **Function**: Displays file content one page at a time.

28. **`head`**:
    - **Usage**: `head file.txt`
    - **Function**: Displays the first few lines of a file.

29. **`tail`**:
    - **Usage**: `tail file.txt`
    - **Function**: Displays the last few lines of a file.

30. **`cmp`**:
    - **Usage**: `cmp file1 file2`
    - **Function**: Compares two files byte by byte.

31. **`diff`**:
    - **Usage**: `diff file1 file2`
    - **Function**: Compares two files and shows the differences.

32. **`sort`**:
    - **Usage**: `sort file.txt`
    - **Function**: Sorts lines in a file alphabetically.

33. **`find`**:
    - **Usage**: `find /directory -name "filename"`
    - **Function**: Searches for files in a directory.

34. **`chmod`**:
    - **Usage**: `chmod +x file.sh`
    - **Function**: Changes the permissions of a file. `+x` makes it executable.

35. **`chown`**:
    - **Usage**: `chown user:group file.txt`
    - **Function**: Changes the ownership of a file.

36. **`ifconfig`**:
    - **Usage**: `ifconfig`
    - **Function**: Displays network interface configuration.

37. **`ip`**:
    - **Usage**: `ip address`
    - **Function**: Displays IP addresses of network interfaces.

38. **`grep`**:
    - **Usage**: `grep 'text' file.txt`
    - **Function**: Searches for patterns in files.

39. **`awk`**:
    - **Usage**: `awk '{print $1}' file.txt`
    - **Function**: Text processing and pattern scanning.

40. **`cat /etc/resolv.conf`**:
    - **Function**: Displays DNS server information from the config file.

41. **`ping`**:
    - **Usage**: `ping google.com`
    - **Function**: Sends ICMP packets to test network connectivity.

42. **`traceroute`**:
    - **Usage**: `traceroute example.com`
    - **Function**: Traces the path packets take to reach a network destination.

43. **`netstat`**:
    - **Usage**: `netstat -tuln`
    - **Function**: Displays active network connections and listening ports.

44. **`ufw`**:
    - **Usage**: `sudo ufw allow 80`
    - **Function**: Manages the Uncomplicated Firewall (UFW).

45. **`uname`**:
    - **Usage**: `uname -a`
    - **Function**: Displays system information (kernel version, architecture).

46. **`neofetch`**:
    - **Usage**: `neofetch`
    - **Function**: Displays system information in a visually appealing format.

47. **`cal`**:
    - **Usage**: `cal`
    - **Function**: Displays the current month's calendar.

48. **`bc`**:
    - **Usage**: `echo "5+3" | bc`
    - **Function**: Command-line calculator for basic arithmetic.

49. **`free`**:
    - **Usage**: `free -h`
    - **Function**: Displays memory usage, with `-h` for human-readable format.

50. **`df`**:
    - **Usage**: `df -h`
    - **Function**: Displays disk space usage.

51. **`ps`**:
    - **Usage**: `ps aux`
    - **Function**: Lists currently running processes.

52. **`top`**:
    - **Usage**: `top`
    - **Function**: Real-time display of running processes and system resource usage.

53. **`htop`**:
    - **Usage**: `htop`
    - **Function**: An interactive process viewer, a more user-friendly version of `top`.

54. **`kill`**:
    - **Usage**: `kill -9 process_id`
    - **Function**: Terminates a process by its process ID.

55. **`pkill`**:
    - **Usage**: `pkill -f process_name`
    - **Function**: Terminates processes by name.

56. **`systemctl`**:
    - **Usage**: `sudo systemctl restart apache2`
    - **Function**: Controls services (start, stop, restart, check status).

57. **`history`**:
    - **Usage**: `history`
    - **Function**: Displays a

 list of recently executed commands.

58. **`reboot`**:
    - **Usage**: `sudo reboot`
    - **Function**: Reboots the system.

59. **`shutdown`**:
    - **Usage**: `sudo shutdown -h now`
    - **Function**: Shuts down the system.

