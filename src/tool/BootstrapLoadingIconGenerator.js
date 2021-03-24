
import React,{useState} from "react";
import {createUseStyles} from 'react-jss'
import { CopyBlock, dracula } from "react-code-blocks";
import TextField from '@material-ui/core/TextField';


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
    }
})

const BootstrapLoadingIconGenerator = ()=>{
    const classes = useStyles()
    const [colorCode,setColorCode] = useState("#906");

    let code= `<div class="d-flex justify-content-center" style="${'color:'+colorCode}">
        <div class="loading-icon spinner-border" role="status"/>
    </div>`

    return (
        <div className="toolContent">
            <div className={classes.option}>
                <form className={classes.optionForm} noValidate autoComplete="off">
                    <TextField className={classes.destinationUrl} label="Link" onChange={event => setColorCode(event.target.value)}/>
                </form>
            </div>
            <div className={classes.preview}>
                <CopyBlock
                    text={code}
                    language={"JSX"}
                    codeBlock
                    theme={dracula}
                    showLineNumbers={false}
                />
            </div>
        </div>)
}

export default BootstrapLoadingIconGenerator
