import React from "react";
import { sleep } from "../tools/sleep";
import { QorySelector } from "./qorySelector";

function leadingZero(angka: string) {
    while (angka.length < 3) {
        angka = "0" + angka;
    }
    return angka;
}
type PlayFileInfo = {

    ayah: number,
    surah: number,
    maxayah: number,
}

type AyahViewCallback = {
    play: () => void,
    setStopped: () => void,
}



export class QrnAudioPlayer {

    constructor() {
        this.setQoryListener();
    }

    audioRef = React.createRef<HTMLAudioElement>();

    listAyahElement: { [key: string]: AyahViewCallback } = {}
    currentFile: PlayFileInfo | null = null;

    isplaying = false;

    async waitAudioRef() {
        while (this.audioRef.current == null) {
            await sleep(500);
        }

        return this.audioRef.current;
    }

    saveViewCallback(a: {
        ayah: number,
        surah: number,
        ayahController: AyahViewCallback

    }) {

        this.listAyahElement[a.surah + "" + a.ayah] = a.ayahController;

    }
    getViewCallback(a: {
        ayah: number,
        surah: number,

    }) {
        return this.listAyahElement[a.surah + "" + a.ayah];
    }

    async play(a: PlayFileInfo) {
        this.isplaying = true;
        let audio = await this.waitAudioRef();

        let srcAudio = QorySelector.current.getQory().url;
        let src = srcAudio +
            leadingZero(a.surah.toString()) +
            leadingZero(a.ayah.toString()) +
            ".mp3";


        this.currentFile = a;

        audio.src = src;
        audio.load();
        try {
            await audio.play();

        } catch (error) {

        }
    }

    async pause() {
        let audio = await this.waitAudioRef();
        audio.pause();
        let lastplay = this.getViewCallback(this.currentFile!)
        lastplay.setStopped()
        this.isplaying = false;
    }
    async setupAudio() {
        await this.waitAudioRef();

    }

    nexPlay() {
        if (this.currentFile == null) return;
        if (this.currentFile.ayah == this.currentFile.maxayah) return;
        let nayah = this.currentFile.ayah + 1;
        let nextREf = this.getViewCallback({ ayah: nayah, surah: this.currentFile.surah })
        if (nextREf != null) {

            nextREf.play();
        }
    }

    setQoryListener() {
        QorySelector.current.onQoriChange = () => {
            if (this.isplaying && this.currentFile != null) {

                this.play(this.currentFile)
            }
        }
    }

    createView(): React.ReactNode {
        return (
            <div>
                <audio
                    onEnded={() => {


                        let lastplay = this.getViewCallback(this.currentFile!)
                        lastplay.setStopped()

                        this.nexPlay();
                    }}
                    ref={this.audioRef}></audio>
            </div>
        )
    }
}