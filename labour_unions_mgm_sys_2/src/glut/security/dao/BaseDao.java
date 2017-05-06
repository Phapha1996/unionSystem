package glut.security.dao;


import java.util.List;

public interface BaseDao<T> {
	T get(Integer id);
    void save(T entity) throws Exception;
    void update(T entity) throws Exception;
    void delete(T entity) throws Exception;

    List<T> findAll();
    int count();

}
