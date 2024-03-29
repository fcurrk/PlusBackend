import React, { useState } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FolderOpenOutlined, LabelOutlined } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import PathSelector from "../FileManager/PathSelector";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    formGroup: {
        display: "flex",
        marginTop: theme.spacing(1),
    },
    formIcon: {
        marginTop: 21,
        marginRight: 19,
        color: theme.palette.text.secondary,
    },
    input: {
        width: 250,
    },
    dialogContent: {
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 8,
        paddingLeft: 24,
    },
    button: {
        marginTop: 8,
    },
}));

export default function CreateWebDAVAccount(props) {
    const { t } = useTranslation();
    const [value, setValue] = useState({
        name: "",
        path: "/",
		password:"",
    });
    const [pathSelectDialog, setPathSelectDialog] = React.useState(false);
    const [selectedPath, setSelectedPath] = useState("");
    // eslint-disable-next-line
    const [selectedPathName, setSelectedPathName] = useState("");
    const classes = useStyles();

    const setMoveTarget = (folder) => {
        const path =
            folder.path === "/"
                ? folder.path + folder.name
                : folder.path + "/" + folder.name;
        setSelectedPath(path);
        setSelectedPathName(folder.name);
    };

    const handleInputChange = (name) => (e) => {
        setValue({
            ...value,
            [name]: e.target.value,
        });
    };

    const selectPath = () => {
        setValue({
            ...value,
            path: selectedPath === "//" ? "/" : selectedPath,
        });
        setPathSelectDialog(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
        >
            <Dialog
                open={pathSelectDialog}
                onClose={() => setPathSelectDialog(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {t("navbar.addTagDialog.selectFolder")}
                </DialogTitle>
                <PathSelector
                    presentPath="/"
                    selected={[]}
                    onSelect={setMoveTarget}
                />

                <DialogActions>
                    <Button onClick={() => setPathSelectDialog(false)}>
                        {t("cancel", { ns: "common" })}
                    </Button>
                    <Button
                        onClick={selectPath}
                        color="primary"
                        disabled={selectedPath === ""}
                    >
                        {t("ok", { ns: "common" })}
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.dialogContent}>
                <div className={classes.formContainer}>
                    <div className={classes.formGroup}>
                        <div className={classes.formIcon}>
                            <LabelOutlined />
                        </div>

                        <TextField
                            className={classes.input}
                            value={value.name}
                            onChange={handleInputChange("name")}
                            label={t("setting.annotation")}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <div className={classes.formIcon}>
                            <LockIcon />
                        </div>

                        <TextField
                            className={classes.input}
                            value={value.password}
                            onChange={handleInputChange("password")}
                            label={t("setting.webdavPassword")}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <div className={classes.formIcon}>
                            <FolderOpenOutlined />
                        </div>
                        <div>
                            <TextField
                                value={value.path}
                                onChange={handleInputChange("path")}
                                className={classes.input}
                                label={t("setting.rootFolder")}
                            />
                            <br />
                            <Button
                                className={classes.button}
                                color="primary"
                                onClick={() => setPathSelectDialog(true)}
                            >
                                {t("navbar.addTagDialog.selectFolder")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <DialogActions>
                <Button onClick={props.onClose}>
                    {t("cancel", { ns: "common" })}
                </Button>
                <Button
                    disabled={value.path === "" || value.name === ""}
                    color="primary"
                    onClick={() => props.callback(value)}
                >
                    {t("ok", { ns: "common" })}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
