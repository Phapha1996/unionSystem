package glut.dao;

import java.util.List;

public interface IBaseDao<T> {
	T get(Integer id);

	void save(T entity) throws Exception;

	void update(T entity) throws Exception;

	void delete(T entity) throws Exception;

	List<T> findAll();

	int count();

	/**
	 * 通过给定的各种参数拼成查询语句,使接口没那么臃肿.如果不需要某些参数,填入null即可. 参数的输入交给业务层.
	 * 
	 * @param selectArgs
	 *            要查找的字段
	 * @param whereArgs
	 *            where条件
	 * @param fromArgs
	 *            从那些表找
	 * @param groupBy
	 *            分组
	 * @param orderBy
	 *            排序
	 * @param having
	 * @param isSQL
	 *            true:执行SQL; false:执行HQL
	 * @return 返回非泛型的List
	 */
	List findByArgs(String selectArgs, String fromArgs, String whereArgs,
			String groupBy, String orderBy, String having, boolean isSQL);
}
