package com.nhl.Digital_Twin_Spoordok.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Methodes in deze klasse met de annotatie @Bean worden door Spring uitgevoerd.
 * De return values komen in de Application Context.
 * <p>
 * De @EnableScheduling zorgt ervoor dat we de @Scheduled annotatie kunnen gebruiken.
 */
@Configuration
@EnableScheduling
public class AppConfig {

}




