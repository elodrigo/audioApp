import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import WavesurferPlayer from "@wavesurfer/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function App() {
  const audioRef = useRef<any>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<any>([]);
  const [tabVal, setTabVal] = useState<number>(0);
  const [url, setUrl] = useState<string>("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUrl(url);
    audioRef.current.play();
  };

  const handleTabChange = (e: any, value: number) => {
    setTabVal(value);
  };

  const moveItemUp = () => {
    if (selectedIndex === null) return;
    const newItems = [...selectedList];
    [newItems[selectedIndex - 1], newItems[selectedIndex]] = [
      newItems[selectedIndex],
      newItems[selectedIndex - 1],
    ];
    setSelectedList(newItems);
  };

  const moveItemDown = () => {
    if (selectedIndex === null || selectedIndex === selectedList.length - 1) {
      return;
    }
    const newItems = [...selectedList];
    [newItems[selectedIndex + 1], newItems[selectedIndex]] = [
      newItems[selectedIndex],
      newItems[selectedIndex + 1],
    ];
    setSelectedList(newItems);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCheckboxClick = (e: any, index: number) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedList([...selectedList, index]);
    } else {
      setSelectedList(selectedList.filter((item: any) => item !== index));
    }
  };

  const handleDelete = () => {
    setSelectedList(selectedList.filter((item: any) => item !== selectedIndex));
  };

  return (
    <Box className="audioApp">
      <Box className="dashedBorder">
        <label htmlFor="file-input">
          <div className="fileLabel">
            <span>클릭하여 파일 선택</span>
          </div>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="file-input"
          multiple
          onChange={handleFileChange}
        />
      </Box>
      <div id="container" className="visualizer">
        <WavesurferPlayer height={100} waveColor="violet" url={url} />
      </div>
      <Box className="audioPlayer">
        <audio ref={audioRef} src={url} style={{ width: "100%" }} />
      </Box>
      <Tabs
        value={tabVal}
        onChange={handleTabChange}
        className="tabContainer"
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="전체목록" />
        <Tab disabled label="중요" />
        <Tab disabled label="저장됨" />
      </Tabs>
      <div className="audioList">
        <List component="nav" aria-label="secondary mailbox folder">
          {selectedList.map((file: any, index: number) => (
            <ListItemButton
              key={index}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <Checkbox
                value={index}
                checked={selectedList[index].name === file.name}
                onClick={(e) => handleCheckboxClick(e, index)}
              />
              <ListItemText primary={file.name} />
              <div className="duration">{file.time}</div>
            </ListItemButton>
          ))}
        </List>
      </div>
      <div className="listControl">
        <IconButton onClick={moveItemUp}>
          <ExpandLessIcon />
        </IconButton>
        <IconButton onClick={moveItemDown}>
          <ExpandMoreIcon />
        </IconButton>
        <IconButton disabled>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </Box>
  );
}
