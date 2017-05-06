package glut.db.auto;

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
 * Member entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see glut.db.auto.Member
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class MemberDAO {
	private static final Logger log = LoggerFactory.getLogger(MemberDAO.class);
	// property constants
	public static final String NAME = "name";
	public static final String ID_CARD = "idCard";
	public static final String EMPLOY_TYPE = "employType";
	public static final String JOIN_CONDITION = "joinCondition";
	public static final String DPM_BRIEF = "dpmBrief";
	public static final String SUB_UNION = "subUnion";
	public static final String DPM_DETAIL = "dpmDetail";
	public static final String DUTY = "duty";
	public static final String TAKE_OFFER_DATE = "takeOfferDate";
	public static final String LEVEL = "level";
	public static final String REACH_LEVEL_DATE = "reachLevelDate";
	public static final String NATIVE_ = "native_";
	public static final String SEX = "sex";
	public static final String NATIONALITY = "nationality";
	public static final String BIRTHDAY = "birthday";
	public static final String TOP_EDUCATION = "topEducation";
	public static final String TOP_DEGREE = "topDegree";
	public static final String POLITICS = "politics";
	public static final String JOIN_DATE = "joinDate";
	public static final String WORK_DATE = "workDate";
	public static final String TITLE = "title";
	public static final String TITLE_LEVEL = "titleLevel";
	public static final String FIRST_EMP_JOB = "firstEmpJob";
	public static final String FIRST_EMP_JOB_TYPE = "firstEmpJobType";
	public static final String GRADUATE_SCH = "graduateSch";
	public static final String TOP_EDU_DATE = "topEduDate";
	public static final String TOP_DEGREE_DATE = "topDegreeDate";
	public static final String MAJOR = "major";
	public static final String SUBJECT = "subject";
	public static final String JOIN_SCH_DATE = "joinSchDate";

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

	public void save(Member transientInstance) {
		log.debug("saving Member instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Member persistentInstance) {
		log.debug("deleting Member instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Member findById(java.lang.String id) {
		log.debug("getting Member instance with id: " + id);
		try {
			Member instance = (Member) getCurrentSession().get(
					"glut.db.auto.Member", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Member instance) {
		log.debug("finding Member instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.Member")
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
		log.debug("finding Member instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Member as model where model."
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

	public List findByIdCard(Object idCard) {
		return findByProperty(ID_CARD, idCard);
	}

	public List findByEmployType(Object employType) {
		return findByProperty(EMPLOY_TYPE, employType);
	}

	public List findByJoinCondition(Object joinCondition) {
		return findByProperty(JOIN_CONDITION, joinCondition);
	}

	public List findByDpmBrief(Object dpmBrief) {
		return findByProperty(DPM_BRIEF, dpmBrief);
	}

	public List findBySubUnion(Object subUnion) {
		return findByProperty(SUB_UNION, subUnion);
	}

	public List findByDpmDetail(Object dpmDetail) {
		return findByProperty(DPM_DETAIL, dpmDetail);
	}

	public List findByDuty(Object duty) {
		return findByProperty(DUTY, duty);
	}

	public List findByTakeOfferDate(Object takeOfferDate) {
		return findByProperty(TAKE_OFFER_DATE, takeOfferDate);
	}

	public List findByLevel(Object level) {
		return findByProperty(LEVEL, level);
	}

	public List findByReachLevelDate(Object reachLevelDate) {
		return findByProperty(REACH_LEVEL_DATE, reachLevelDate);
	}

	public List findByNative_(Object native_) {
		return findByProperty(NATIVE_, native_);
	}

	public List findBySex(Object sex) {
		return findByProperty(SEX, sex);
	}

	public List findByNationality(Object nationality) {
		return findByProperty(NATIONALITY, nationality);
	}

	public List findByBirthday(Object birthday) {
		return findByProperty(BIRTHDAY, birthday);
	}

	public List findByTopEducation(Object topEducation) {
		return findByProperty(TOP_EDUCATION, topEducation);
	}

	public List findByTopDegree(Object topDegree) {
		return findByProperty(TOP_DEGREE, topDegree);
	}

	public List findByPolitics(Object politics) {
		return findByProperty(POLITICS, politics);
	}

	public List findByJoinDate(Object joinDate) {
		return findByProperty(JOIN_DATE, joinDate);
	}

	public List findByWorkDate(Object workDate) {
		return findByProperty(WORK_DATE, workDate);
	}

	public List findByTitle(Object title) {
		return findByProperty(TITLE, title);
	}

	public List findByTitleLevel(Object titleLevel) {
		return findByProperty(TITLE_LEVEL, titleLevel);
	}

	public List findByFirstEmpJob(Object firstEmpJob) {
		return findByProperty(FIRST_EMP_JOB, firstEmpJob);
	}

	public List findByFirstEmpJobType(Object firstEmpJobType) {
		return findByProperty(FIRST_EMP_JOB_TYPE, firstEmpJobType);
	}

	public List findByGraduateSch(Object graduateSch) {
		return findByProperty(GRADUATE_SCH, graduateSch);
	}

	public List findByTopEduDate(Object topEduDate) {
		return findByProperty(TOP_EDU_DATE, topEduDate);
	}

	public List findByTopDegreeDate(Object topDegreeDate) {
		return findByProperty(TOP_DEGREE_DATE, topDegreeDate);
	}

	public List findByMajor(Object major) {
		return findByProperty(MAJOR, major);
	}

	public List findBySubject(Object subject) {
		return findByProperty(SUBJECT, subject);
	}

	public List findByJoinSchDate(Object joinSchDate) {
		return findByProperty(JOIN_SCH_DATE, joinSchDate);
	}

	public List findAll() {
		log.debug("finding all Member instances");
		try {
			String queryString = "from Member";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Member merge(Member detachedInstance) {
		log.debug("merging Member instance");
		try {
			Member result = (Member) getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Member instance) {
		log.debug("attaching dirty Member instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Member instance) {
		log.debug("attaching clean Member instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static MemberDAO getFromApplicationContext(ApplicationContext ctx) {
		return (MemberDAO) ctx.getBean("MemberDAO");
	}
}