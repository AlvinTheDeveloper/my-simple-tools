import React,{useState} from "react";
import {createUseStyles} from 'react-jss'
import { CopyBlock, dracula } from "react-code-blocks";
import TextField from '@material-ui/core/TextField';
import jsxToString from 'jsx-to-string';
const prettify=require('html-prettify');

const useStyles = createUseStyles({
    contentFloat:{
        float: 'left'
    },
    preview: {
        extend:'contentFloat',
        textAlign: 'left',
        width:'60%',
    },
    option: {
        extend:'contentFloat',
        padding: '15px',
        width: '40%'
    },
    destinationUrl:{
        width:"100%"
        // width:"200px"
    }
})

const JsRedirectCodeGenerator = ()=>{
    const classes = useStyles()
    const [destinationUrl,setDestinationUrl] = useState("http://localhost:3000");
    console.log(`destinationUrl:${destinationUrl}`)
    let code= <script>{`window.location.href="${destinationUrl}"`}</script>
    console.log(`code:${jsxToString(code)}`)
    return (
        <div className="toolContent">
        <div className={classes.option}>
            <form className={classes.optionForm} noValidate autoComplete="off">
                <TextField className={classes.destinationUrl} label="Link" onChange={event => setDestinationUrl(event.target.value)}/>
            </form>
        </div>
        <div className={classes.preview}>
            <CopyBlock
                text={jsxToString(code)}
                language={"JSX"}
                codeBlock
                theme={dracula}
                showLineNumbers={false}
            />
        </div>
    </div>)
}

export default JsRedirectCodeGenerator
