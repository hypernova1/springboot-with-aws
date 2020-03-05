package com.melchor.book.domain.posts;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest // 별다른 설정없이 사용할 경우 h2 데이터베이스 자동실행
public class PostsRepositoryTest {

    @Autowired
    private PostsRepository postsRepository;

    @After
    public void cleanup() {
        postsRepository.deleteAll();
    }

    @Test
    public void savePosts() {

        String title =  "테스트 게시글";
        String content = "테스트 본문";

        Posts post = Posts.builder()
                .title(title)
                .content(content)
                .author("hypemova@gmail.com")
                .build();

        postsRepository.save(post);

        List<Posts> all = postsRepository.findAll();

        Posts savedPost = all.get(0);
        assertThat(savedPost.getTitle()).isEqualTo(title);
        assertThat(savedPost.getContent()).isEqualTo(content);
    }

}