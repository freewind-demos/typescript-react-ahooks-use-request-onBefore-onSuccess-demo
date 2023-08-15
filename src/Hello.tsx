import React, {FC, useState} from 'react';
import './Hello.pcss';
import {useRequest} from "ahooks";

type Props = {};

export const Hello: FC<Props> = ({}) => {
    const [text, setText] = useState('init');

    const request = useRequest(async () => {
        console.log("### useRequest:", text);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setText('hello')
                resolve()
                console.log("### after resolve:", text)
            }, 1000)
        })
    }, {
        manual: true,
        onBefore: () => {
            console.log('### onBefore:', text);
            setText('before')
        },
        onSuccess: () => {
            console.log('### success:', text);
            setText('success')
        },
    })
    return <div className={'Hello'}>
        <button onClick={() => request.run()}>Hello</button>
        <div>{text}</div>
    </div>;
}
