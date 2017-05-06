package glut.security;

import glut.db.auto.Resources;
import glut.security.dao.ResourcesDao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

//1 ������Դ��Ȩ�޵Ķ�Ӧ��ϵ
public class MySecurityMetadataSource implements
		FilterInvocationSecurityMetadataSource {
	private static Logger logger = Logger
			.getLogger(MySecurityMetadataSource.class);

	// ��spring����
	public MySecurityMetadataSource(ResourcesDao resourcesDao) {
		this.resourcesDao = resourcesDao;
		// loadResourceDefine();
	}

	private ResourcesDao resourcesDao;
	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

	public ResourcesDao getResourcesDao() {
		return resourcesDao;
	}

	public void setResourcesDao(ResourcesDao resourcesDao) {
		this.resourcesDao = resourcesDao;
	}

	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		logger.debug("MySecurityMetadataSource---getAllConfigAttributes");
		return null;
	}

	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return true;
	}

	// ����������Դ��Ȩ�޵Ĺ�ϵ
	private void loadResourceDefine() {
		logger.debug("MySecurityMetadataSource---loadResourceDefine");

		if (resourceMap == null) {
			resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
			List<Resources> resources = this.resourcesDao.findAll();
			for (Resources resource : resources) {
				Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
				// ��Ȩ�����װΪSpring��security Object
				ConfigAttribute configAttribute = new SecurityConfig(
						resource.getName());
				configAttributes.add(configAttribute);
				resourceMap.put(resource.getUrl(), configAttributes);
			}
		}

		Set<Entry<String, Collection<ConfigAttribute>>> resourceSet = resourceMap
				.entrySet();
		Iterator<Entry<String, Collection<ConfigAttribute>>> iterator = resourceSet
				.iterator();

	}

	// ������������Դ����Ҫ��Ȩ��
	public Collection<ConfigAttribute> getAttributes(Object object)
			throws IllegalArgumentException {
		logger.debug("MySecurityMetadataSource---getAttributes");

		Collection<ConfigAttribute> returnCollection = new ArrayList<ConfigAttribute>();

		String requestUrl = ((FilterInvocation) object).getRequestUrl();
		logger.debug("requestUrl is " + requestUrl);

		if (resourceMap == null) {
			loadResourceDefine();
		}
		Set<String> keysSet = resourceMap.keySet();
		String[] keys = keysSet.toArray(new String[keysSet.size()]);
		String prefix = "";
		for (int i = 0; i < keys.length; i++) {
			String key = keys[i];
			if (key.contains("**")) {
				String[] pp = key.split("[**]");
				prefix = pp[0];
			} else {
				prefix = key;
			}
			//比较请求的url和权限表的url是否一致
			if (requestUrl.contains(prefix)) {
				String str = resourceMap.get(key).toString();
				//去掉中括号
				String value = str.substring(str.indexOf("[") + 1,
						str.indexOf("]"));
				returnCollection.add(new SecurityConfig(value));
			}

		}
		/*		Collection<ConfigAttribute> returnCollection = resourceMap
						.get(requestUrl);
				if (returnCollection == null) // 找不到与之匹配的权限配置，返回一个空对象，而不能是null
					returnCollection = new ArrayList<ConfigAttribute>();
				returnCollection.add(new SecurityConfig("ROLE_NO_USER"));
		*/return returnCollection;
	}

}
