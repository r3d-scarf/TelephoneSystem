package com.chnu.pavel.telephone.controller.rest;

import com.chnu.pavel.telephone.model.City;
import com.chnu.pavel.telephone.service.city.interfaces.CityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * TelephoneSystem.CityRestController
 *
 * @Autor: Pavel Shcherbatyi
 * @DateTime: 07.04.2021|19:37
 * @Version CityRestController: 1.0
 */

@RestController
@RequestMapping("/api/cities")
@AllArgsConstructor
public class CityRestController {

    private final CityService service;

    @RequestMapping("/get/all/")
    public List<City> getCities() {
        return service.findAll();
    }

    @PostMapping("/create/")
    public City create( @RequestBody City city) {
        return service.create(city);
    }

    @GetMapping("/get/{id}")
    public City getById( @PathVariable("id") String id) {
        return service.findById(Long.valueOf(id));
    }

    @PostMapping("/update/{id}")
    public City updateById( @RequestBody City city, @PathVariable("id") String id) {
        return service.updateById(Long.valueOf(id), city);
    }

    @GetMapping("delete/{id}")
    public City deleteById(@PathVariable("id") String id) {
        return service.deleteById(Long.valueOf(id));
    }

}
