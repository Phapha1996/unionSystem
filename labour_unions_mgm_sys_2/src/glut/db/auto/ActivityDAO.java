package glut.db.auto;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Set;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;

/**
 * A data access object (DAO) providing persistence and search support for
 * Activity entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see glut.db.auto.Activity
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class ActivityDAO {
	private static final Logger log = LoggerFactory
			.getLogger(ActivityDAO.class);
	// property constants
	public static final String NAME = "name";
	public static final String OBJECT = "object";
	public static final String NOTES = "notes";
	public static final String STATUS = "status";
	public static final String POPULATION_LIMIT = "populationLimit";
	public static final String ACTIVITY_TYPE = "activityType";
	public static final String POPULATION_CURRENT = "populationCurrent";
	public static final String TEMPLATE = "template";
	public static final String ACT_LOCATION = "actLocation";
	public static final String ACT_CUSTOMTIME = "actCustomtime";

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	protected void initDao() {
		// do nothing
	}

	public void save(Activity transientInstance) {
		log.debug("saving Activity instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Activity persistentInstance) {
		log.debug("deleting Activity instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Activity findById(java.lang.String id) {
		log.debug("getting Activity instance with id: " + id);
		try {
			Activity instance = (Activity) getCurrentSession().get(
					"glut.db.auto.Activity", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Activity instance) {
		log.debug("finding Activity instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.Activity")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Activity instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Activity as model where model."
					+ propertyName + "= ?";
			Query queryObject = getCurrentSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByName(Object name) {
		return findByProperty(NAME, name);
	}

	public List findByObject(Object object) {
		return findByProperty(OBJECT, object);
	}

	public List findByNotes(Object notes) {
		return findByProperty(NOTES, notes);
	}

	public List findByStatus(Object status) {
		return findByProperty(STATUS, status);
	}

	public List findByPopulationLimit(Object populationLimit) {
		return findByProperty(POPULATION_LIMIT, populationLimit);
	}

	public List findByActivityType(Object activityType) {
		return findByProperty(ACTIVITY_TYPE, activityType);
	}

	public List findByPopulationCurrent(Object populationCurrent) {
		return findByProperty(POPULATION_CURRENT, populationCurrent);
	}

	public List findByTemplate(Object template) {
		return findByProperty(TEMPLATE, template);
	}

	public List findByActLocation(Object actLocation) {
		return findByProperty(ACT_LOCATION, actLocation);
	}

	public List findByActCustomtime(Object actCustomtime) {
		return findByProperty(ACT_CUSTOMTIME, actCustomtime);
	}

	public List findAll() {
		log.debug("finding all Activity instances");
		try {
			String queryString = "from Activity";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Activity merge(Activity detachedInstance) {
		log.debug("merging Activity instance");
		try {
			Activity result = (Activity) getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Activity instance) {
		log.debug("attaching dirty Activity instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Activity instance) {
		log.debug("attaching clean Activity instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ActivityDAO getFromApplicationContext(ApplicationContext ctx) {
		return (ActivityDAO) ctx.getBean("ActivityDAO");
	}
}