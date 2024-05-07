package com.zegel.backendpos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories
public class BackendPosApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendPosApplication.class, args);
	}

}
