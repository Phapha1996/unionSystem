package glut.security;

import glut.db.auto.Resources;
import glut.db.auto.RolesResources;
import glut.db.auto.Users;
import glut.db.auto.UsersRoles;
import glut.security.dao.UsersDao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

//2
public class MyUserDetailServiceImpl implements UserDetailsService {
	private static Logger logger = Logger
			.getLogger(MyUserDetailServiceImpl.class);

	private UsersDao usersDao;

	public UsersDao getUsersDao() {
		return usersDao;
	}

	public void setUsersDao(UsersDao usersDao) {
		this.usersDao = usersDao;
	}

	//��¼��֤
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		logger.debug("MyUserDetailServiceImpl---loadUserByUsername");
		logger.debug("username is " + username);

		//����Ӧ�ÿ��Բ����ٲ���
		Users users = this.usersDao.findByName(username);

		Collection<GrantedAuthority> grantedAuths = obtionGrantedAuthorities(users);

		boolean enables = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		//��װ��spring security��user
		User userdetail = new User(users.getMember().getNumber(), users.getPassword(),
				enables, accountNonExpired, credentialsNonExpired,
				accountNonLocked, grantedAuths);
		return userdetail;
	}

	//ȡ���û���Ȩ��
	private Set<GrantedAuthority> obtionGrantedAuthorities(Users user) {
		logger.debug("MyUserDetailServiceImpl---obtionGrantedAuthorities");
		Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
		List<Resources> resources = new ArrayList<Resources>();
		Set<UsersRoles> roles = user.getUsersRoleses();

		for (UsersRoles role : roles) {
			Set<RolesResources> rr = role.getRoles().getRolesResourceses();
			for (RolesResources res : rr) {
				resources.add(res.getResources());
			}
		}
		for (Resources res : resources) {
			authSet.add(new GrantedAuthorityImpl(res.getName()));
		}
		return authSet;
	}
}
