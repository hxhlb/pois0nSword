# cve-2025-43529-arbitrary-ref
A demonstration of arbitrary address referencing using cve-2025-43529
Most of the code comes from cve-2025-43529 POC by jir4vv1t and the darksword web implementation. (https://github.com/ghh-jb/DarkSword/) 

# Write-up 
As stated by @zeroxjf in his write up on the vulnerability found [here](https://github.com/zeroxjf/WebKit-UAF-ANGLE-OOB-Analysis), as well as stated in the original poc by @jir4vv1t, the problem is that PAC completely blocks any attempt at reference. 

This repo attempts to use darkswords method of using a similar vuln to get r/w and gets blocked when accessing + 0x10n the current address with kern protection failure listed as the reason. It also crashes on arbitrary out of bounds addresses. 

Darksword *has* a PAC bypass which relies on two things: 
1. offsets for the phone and version.
2. R/W primative from the initial fakeobj and addrof alone.

After trying to acheieve the second objective in this repo, we access a random address, and then get a crash.
Hypothetically if we had offsets, *and* a way to use the dylib PAC bypass without read and write we could obtain r/w. 

Regarding the related ANGLE-OOB: The way the OOB referenced in @zeroxjf's analysis repo, *is* related and *is* used in DarkSword, however it is used *after* IPC port which is opened using read / write and offsets. Hence why @zeroxjf couldn't verify the OOB fully, without a way of transmitting messages between the OOB and an IPC port; the OOB isn't of use to us at all. 

# Future ideas and invitation for contributions
The major place I will continue focusing on is understanding the dylib PAC bypass and if it is possible to use after fakeobj and addrof are established in order to get R/W. If the PAC bypass could be used, it would then be possible to use the ANGLE-OOB sandbox escape method which was used in darksword. 

