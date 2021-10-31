import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import Videolist from './components/video_list/video_list';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVido] = useState(null);

  const selectVideo = (video) => {
    setSelectedVido(video);
  }
  const search = query => {
    youtube
      .search(query)
      .then(videos => setVideos(videos));
  };

  // data를 받아오거나, 마운트가 되었을 때마다 호출되는 함수
  // 지금은 *빈 배열[]을 전달했기 때문에, mount가 될때 한번 호출
  useEffect(()=>{
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, []); //*
  // api로 popular 영상 item 받아서 업데이트를 하면, 이제 videos를 videolist component에 전달
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search}/>
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
          <VideoDetail video = {selectedVideo} />
        </div>
        )}
        <div className={styles.list}>
          <Videolist videos={videos} onVideoClick={selectVideo} display={selectedVideo? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;