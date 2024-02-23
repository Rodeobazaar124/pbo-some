import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useState } from "react";

const TVForm = (
    tvData = { name: "LG", slug: "LG", type: "TV", volume: "10", channel: 10 }
) => {
    const [volume, setVolume] = useState(tvData.volume);
    const [channel, setChannel] = useState(tvData.channel);

    const changeVol = (e) => {
        setVolume(e.target.value);
    };
    let changeCH = (direction) => {
        switch (direction) {
            case "up":
                setChannel(channel + 1);
                break;
            case "down":
                setChannel(channel - 1);
                break;
            default:
                break;
        }
    };
    return (
        <section>
            <form className="flex flex-col gap-2">
                <input value={tvData.name} type="text"></input>
                <InputLabel htmlFor="volume" value="Volume" />
                <input
                    id="volume"
                    type="range"
                    className="appearance-none bg-stone-50 rounded-lg"
                    value={volume}
                    onChange={changeVol}
                />
                <div className="flex flex-col">
                    <button onClick={()=>changeCH('up')}>🔼</button>
                    <input
                        type="text"
                        name="channel"
                        id="channel"
                        value={tvData.channel}
                    />
                    <button onClick={()=>changeCH('down')}>🔽</button>
                </div>
                <InputLabel value={volume + "%"} />
                <PrimaryButton>Change</PrimaryButton>
            </form>
        </section>
    );
};

export default TVForm;
